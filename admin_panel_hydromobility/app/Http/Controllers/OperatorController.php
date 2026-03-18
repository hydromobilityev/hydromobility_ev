<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Operator;
use App\Models\Trips;
use App\Models\TripRequests;
use Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use Twilio\Rest\Client;
use Carbon\Carbon;
use App\DriverEarning;

class OperatorController extends Controller
{
    public function login(Request $request){

        $input = $request->all();
        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $credentials = request(['phone_with_code', 'password']);
        $operator = Operator::where('phone_with_code',$credentials['phone_with_code'])->first();

        if(!($operator)) {
            return response()->json([
                "message" => 'Invalid phone number or password',
                "status" => 0
            ]);
        }
        if (Hash::check($credentials['password'], $operator->password)) {
            if($operator->status == 1){
                return response()->json([
                    "result" => $operator,
                    "message" => 'Success',
                    "status" => 1
                ]);   
            }else{
                return response()->json([
                    "message" => 'Your account has been blocked',
                    "status" => 0
                ]);
            }
        }else{
            return response()->json([
                "message" => 'Invalid phone number or password',
                "status" => 0
            ]);
        }
    }

    public function check_phone(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        
        $data = array();
        $operator = Operator::where('phone_with_code',$input['phone_with_code'])->first();

        if(is_object($operator)){
            if($operator->password){
                $data['is_available'] = 2;
            }else{
                $data['is_available'] = 1;
            }
            $data['otp'] = "";
            $data['id'] = $operator->id;
            return response()->json([
                "result" => $data,
                "message" => 'Success',
                "status" => 1
            ]);
        }else{
            $data['is_available'] = 0;
            return response()->json([
                "message" => 'Your number is not registered, please contact admin',
                "status" => 2
            ]);
        }
    }

    public function reset_password(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required',
            'password' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $options = [
            'cost' => 12,
        ];
        $input['password'] = password_hash($input["password"], PASSWORD_DEFAULT, $options);

        if(Operator::where('id',$input['id'])->update($input)){
            return response()->json([
                "message" => 'Success',
                "status" => 1
            ]);
        }else{
            return response()->json([
                "message" => 'Sorry something went wrong',
                "status" => 0
            ]);
        }
    }

    public function forget_password(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'phone_with_code' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $operator = Operator::where('phone_with_code',$input['phone_with_code'])->first();

        if(is_object($operator)){
            $data['id'] = $operator->id;
            $data['otp'] = rand(1000,9999);
            if(env('MODE') != 'DEMO'){
                $message = "Hi".env('APP_NAME'). "  , Your OTP code is:".$data['otp'];
                $this->sendSms($input['phone_with_code'],$message);
            }
            return response()->json([
                "result" => $data,
                "message" => 'Success',
                "status" => 1
            ]);
        }else{
            return response()->json([
                "result" => 'Please enter valid phone number',
                "status" => 0
            ]);
            
        }

    }

    public function profile_update(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required'
            
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        if($request->password){
            $options = [
                'cost' => 12,
            ];
            $input['password'] = password_hash($input["password"], PASSWORD_DEFAULT, $options);
            $input['status'] = 1;
        }else{
            unset($input['password']);
        }

        if (Operator::where('id',$input['id'])->update($input)) {
            return response()->json([
                "result" => Operator::where('id',$input['id'])->first(),
                "message" => 'Success',
                "status" => 1
            ]);
        } else {
            return response()->json([
                "message" => 'Sorry, something went wrong...',
                "status" => 0
            ]);
        }

    }

    public function get_profile(Request $request){

        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $operator = Operator::where('id',$input['id'])->first();
        if(is_object($operator)){
            return response()->json([
                "result" => $operator,
                "message" => 'Success',
                "status" => 1
            ]);
        }
        else{
            return response()->json([
                "message" => 'Something went wrong',
                "status" => 0
            ]);
        }
    }
    
    public function get_drivers(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'operator_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        
        $data = [];
        $op_vehicles = DB::table('operator_vehicles')->where('operator_id',$input['operator_id'])->get();
        foreach($op_vehicles as $key => $value){
            $data[$key] = DB::table('driver_vehicles')
                                ->leftjoin('drivers','drivers.id','=','driver_vehicles.driver_id')
                                ->where('driver_vehicles.id',$value->vehicle_id)
                                ->select('drivers.*','driver_vehicles.vehicle_name','driver_vehicles.vehicle_number')
                                ->first();
        }
        
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }
    
    public function get_vehicles(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'operator_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        
        $factory = (new Factory())->withDatabaseUri(env('FIREBASE_DB'));
        $database = $factory->createDatabase();
                    
        $data = [];
        $op_vehicles = DB::table('operator_vehicles')->where('operator_id',$input['operator_id'])->get();
        foreach($op_vehicles as $key => $value){
            $row = DB::table('driver_vehicles')
                                ->leftjoin('drivers','drivers.id','=','driver_vehicles.driver_id')
                                ->where('driver_vehicles.id',$value->vehicle_id)
                                ->select('driver_vehicles.*','drivers.wallet','drivers.online_status')
                                ->first();
            $live_status = $database->getReference('drivers/'.$row->vehicle_type.'/'.$row->driver_id)->getValue();
            if($row->online_status == 0){
                $row->live_status = "Offline";
            }else if($row->online_status == 1){
                if($live_status['booking']['booking_status'] == 0){
                    $row->live_status = "Idle";
                }else{
                    $bk_status = DB::table('trips')->where('id',$live_status['booking']['booking_id'])->value('status');
                    $row->live_status = DB::table('booking_statuses')->where('id',$bk_status)->value('status_name');
                }
            }           
            $row->lat = $live_status['geo']['lat'];
            $row->lng = $live_status['geo']['lng'];
            $data[$key] = $row;
        }
        
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }
    
    public function get_accounts(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'vehicle_id' => 'required',
            'type' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $driver_id = DB::table('driver_vehicles')->where('id',$input['vehicle_id'])->value('driver_id');
        if($input['type'] == 1){
            $ids = DB::table('trips')->where('driver_id',$driver_id)->whereDate('pickup_date', Carbon::today())->where('status',5)->pluck('id')->toArray();
            $data['billing_amount'] = DB::table('trips')->whereIn('id',$ids)->sum('total');
            $data['earnings'] = DB::table('driver_earnings')->whereIn('trip_id',$ids)->sum('amount');
            $data['online_transaction'] = DB::table('payment_histories')->where('mode','=','Wallet')->whereIn('trip_id',$ids)->sum('amount');
            $data['cash_collection'] = DB::table('payment_histories')->where('mode','=','Cash')->whereIn('trip_id',$ids)->sum('amount');
        }else if($input['type'] == 2){
            $ids = DB::table('trips')->where('driver_id',$driver_id)->whereDate('pickup_date', Carbon::yesterday()->format('Y-m-d'))->where('status',5)->pluck('id')->toArray();
            $data['billing_amount'] = DB::table('trips')->whereIn('id',$ids)->sum('total');
            $data['earnings'] = DB::table('driver_earnings')->whereIn('trip_id',$ids)->sum('amount');
            $data['online_transaction'] = DB::table('payment_histories')->where('mode','=','Wallet')->whereIn('trip_id',$ids)->sum('amount');
            $data['cash_collection'] = DB::table('payment_histories')->where('mode','=','Cash')->whereIn('trip_id',$ids)->sum('amount');
        }else if($input['type'] == 3){
            $ids = DB::table('trips')->where('driver_id',$driver_id)->whereBetween('pickup_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('status',5)->pluck('id')->toArray();
            $data['billing_amount'] = DB::table('trips')->whereIn('id',$ids)->sum('total');
            $data['earnings'] = DB::table('driver_earnings')->whereIn('trip_id',$ids)->sum('amount');
            $data['online_transaction'] = DB::table('payment_histories')->where('mode','=','Wallet')->whereIn('trip_id',$ids)->sum('amount');
            $data['cash_collection'] = DB::table('payment_histories')->where('mode','=','Cash')->whereIn('trip_id',$ids)->sum('amount');
        }else if($input['type'] == 4){
            $ids = DB::table('trips')->where('driver_id',$driver_id)->whereBetween('pickup_date', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->where('status',5)->pluck('id')->toArray();
            $data['billing_amount'] = DB::table('trips')->whereIn('id',$ids)->sum('total');
            $data['earnings'] = DB::table('driver_earnings')->whereIn('trip_id',$ids)->sum('amount');
            $data['online_transaction'] = DB::table('payment_histories')->where('mode','=','Wallet')->whereIn('trip_id',$ids)->sum('amount');
            $data['cash_collection'] = DB::table('payment_histories')->where('mode','=','Cash')->whereIn('trip_id',$ids)->sum('amount');
        }
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }
    
    public function get_performance(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'vehicle_id' => 'required',
            'date' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $driver_id = DB::table('driver_vehicles')->where('id',$input['vehicle_id'])->value('driver_id');
        
        //Today
        $t_ids = DB::table('trips')->where('driver_id',$driver_id)->whereDate('pickup_date',$input['date'])->where('status',5)->pluck('id')->toArray();
        $today_earnings = DB::table('driver_earnings')->whereIn('trip_id',$t_ids)->sum('amount');
        $today_bill = DB::table('trips')->whereIn('id',$t_ids)->sum('total');
        
        //Week
        $w_ids = DB::table('trips')->where('driver_id',$driver_id)->whereBetween('pickup_date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])->where('status',5)->pluck('id')->toArray();
        $week_earnings = DB::table('driver_earnings')->whereIn('trip_id',$w_ids)->sum('amount');
        
        //Month
        $m_ids = DB::table('trips')->where('driver_id',$driver_id)->whereBetween('pickup_date', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])->where('status',5)->pluck('id')->toArray();
        $month_earnings = DB::table('driver_earnings')->whereIn('trip_id',$m_ids)->sum('amount');
        
        $data['today_earnings'] = number_format((float)$today_earnings, 2, '.', '');
        $data['month_earnings'] = number_format((float)$month_earnings, 2, '.', '');
        $data['week_earnings'] = number_format((float)$week_earnings, 2, '.', '');
        $data['today_bill'] = number_format((float)$today_bill, 2, '.', '');
        $data['earnings'] = DriverEarning::whereIn('trip_id',$t_ids)->get();
        $data['total_trip_count'] = count($t_ids);
        
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_dashboard(Request $request){
        $input = $request->all();
        $validator = Validator::make($input, [
            'operator_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        
        $data = [];
        $active_count = 0;
        $inactive_count = 0;
        $today_earnings = 0;
        $total_earnings = 0;
        $wallet = 0;
        $wd = 0;
        $op_vehicles = DB::table('operator_vehicles')->where('operator_id',$input['operator_id'])->get();
        foreach($op_vehicles as $key => $value){
            $row = DB::table('driver_vehicles')
                                        ->leftjoin('drivers','drivers.id','=','driver_vehicles.driver_id')
                                        ->where('driver_vehicles.id',$value->vehicle_id)
                                        ->select('drivers.*')
                                        ->first();
            if($row->online_status == 1){
                $active_count++;
            }else{
                $inactive_count++;
            }
            
            $t_ids = DB::table('trips')->where('driver_id',$row->id)->whereDate('pickup_date', Carbon::today())->where('status',5)->pluck('id')->toArray();
            $today_earnings += DB::table('driver_earnings')->whereIn('trip_id',$t_ids)->sum('amount');
            
            $to_ids = DB::table('trips')->where('driver_id',$row->id)->where('status',5)->pluck('id')->toArray();
            $total_earnings += DB::table('driver_earnings')->whereIn('trip_id',$to_ids)->sum('amount');
            
            $wallet += $row->wallet;
            $wd += DB::table('driver_withdrawals')->where('driver_id',$row->id)->where('status',11)->count();
        }
        
        $data['active_count'] = $active_count;
        $data['inactive_count'] = $inactive_count;
        $data['today_earnings'] = $today_earnings;
        $data['total_earnings'] = $total_earnings;
        $data['wallet'] = $wallet;
        $data['withdrawal_count'] = $wd;
        
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }
    
    public function sendSms($phone_number,$message)
    {
        $sid    = env( 'TWILIO_SID' );
        $token  = env( 'TWILIO_TOKEN' );
        $client = new Client( $sid, $token );
        $client->messages->create($phone_number,[ 'from' => env( 'TWILIO_FROM' ),'body' => $message,]);
        return true;
    }

    
    public function sendError($message) {
        $message = $message->all();
        $response['error'] = "validation_error";
        $response['message'] = implode('',$message);
        $response['status'] = "0";
        return response()->json($response, 200);
    } 
}



   


