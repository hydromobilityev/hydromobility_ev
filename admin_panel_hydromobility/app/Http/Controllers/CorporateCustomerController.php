<?php

namespace App\Http\Controllers;

use App\AppSetting;
use App\ContactSetting;
use Illuminate\Http\Request;
use Validator;
use App\CorporateCustomer;
use App\CorporateCustomerRequest;
use App\Customer;
use App\DriverVehicle;
use App\Models\CorporateAgent;
use App\Models\CustomerPromoHistory;
use App\Models\Group;
use App\Models\PaymentStatement;
use App\Models\Policy;
use App\Models\TripRequest;
use App\Models\TripRequestStatus;
use App\PromoCode;
use App\Trip;
use App\TripSetting;
use App\VehicleCategory;
use Illuminate\Support\Facades\Hash;
use Cartalyst\Stripe\Stripe;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use Mail;
use DateTime;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

class CorporateCustomerController extends Controller
{

    public function corporatecustomerRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name'      => 'required',
            'last_name'       => 'required',
            'phone_number'    => 'required',
            'phone_with_code' => 'required',
            'company_email'   => 'required',
            'company_name'    => 'required',
            'designation'     => 'required',
            'address'         => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $corporate = CorporateCustomerRequest::create([
            'first_name'      => $request->first_name,
            'last_name'       => $request->last_name,
            'phone_number'    => $request->phone_number,
            'phone_with_code' => $request->phone_with_code,
            'company_email'   => $request->company_email,
            'company_name'    => $request->company_name,
            'designation'     => $request->designation,
            'address'         => $request->address,
            'status'          => 0,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Corporate customer request submitted successfully.',
            'data'    => $corporate,
        ], 201);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $username = $request->username;
        $password = $request->password;

        $corporate = CorporateCustomer::where('username', $username)->first();

        if ($corporate) {
            if (hash_equals($corporate->password, crypt($password, $corporate->password))) {
                if ($corporate->status == 1) {
                    return response()->json([
                        "user_type" => "corporate_customer",
                        "result" => $corporate,
                        "message" => "Success",
                        "status" => 1,
                    ]);
                } else {
                    return response()->json([
                        "message" => "Your account has been blocked",
                        "status" => 0,
                    ]);
                }
            } else {
                return response()->json([
                    "message" => "Invalid username or password",
                    "status" => 0,
                ]);
            }
        }

        $agent = CorporateAgent::where('username', $username)->first();

        if ($agent) {
            if (hash_equals($agent->password, crypt($password, $agent->password))) {
                if ($agent->status == 1) {

                    $corporate = CorporateCustomer::find($agent->corporate_customer_id);
                    $agent->company_name = $corporate?->company_name;
                    return response()->json([
                        "user_type" => "corporate_agent",
                        "result"    => $agent,
                        "message"   => "Success",
                        "status"    => 1,
                    ]);
                } else {
                    return response()->json([
                        "message" => "Your account has been blocked",
                        "status"  => 0,
                    ]);
                }
            } else {
                return response()->json([
                    "message" => "Invalid username or password",
                    "status"  => 0,
                ]);
            }
        }


        return response()->json([
            "message" => "Invalid username or password",
            "status" => 0,
        ]);
    }
    public function changePassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username'     => 'required|exists:corporate_customers,username',
            'new_password' => 'required|min:6',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $customer = CorporateCustomer::where('username', $request->username)->first();

        if (!$customer) {
            return response()->json([
                'status'  => false,
                'message' => 'User not found.',
            ], 404);
        }
        $customer->password = Hash::make($request->new_password);
        $customer->save();

        return response()->json([
            'status'  => true,
            'message' => 'Password changed successfully.',
        ], 200);
    }

    public function profile_image_upload(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'image' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $name = time() . '.' . $image->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/corporate_customers');
            $image->move($destinationPath, $name);
            return response()->json([
                "result" => 'corporate_customers/' . $name,
                "message" => 'Success',
                "status" => 1
            ]);
        }
    }


    public function profile_picture_update(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'id' => 'required',
            'profile_picture' => 'required'

        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if (CorporateCustomer::where('id', $input['id'])->update($input)) {
            return response()->json([
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


    public function profile_update(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'id' => 'required|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => $validator->errors()->first(),
            ]);
        }

        $id = $input['id'];
        unset($input['id']);

        if ($request->filled('password')) {
            $options = ['cost' => 12];
            $input['password'] = password_hash($input['password'], PASSWORD_DEFAULT, $options);
            $input['status'] = 1;
        } else {
            unset($input['password']);
        }

        if (CorporateCustomer::where('id', $id)->update($input)) {
            $result = CorporateCustomer::select(
                'id',
                'first_name',
                'last_name',
                'company_name',
                'designation',
                'email',
                'profile_picture',
                'password',
                'address',
                'username',
            )->find($id);

            return response()->json([
                'result'  => $result,
                'message' => 'Success',
                'status'  => 1,
            ]);
        } else {
            return response()->json([
                'message' => 'Sorry, something went wrong...',
                'status'  => 0,
            ]);
        }
    }

    public function get_profile(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $result = CorporateCustomer::where('id', $input['corporate_customer_id'])->first();
        if (is_object($result)) {
            return response()->json([
                "result" => $result,
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
    /*   public function reset_password(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $options = [
            'cost' => 12,
        ];

        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT, $options);

        $updated = CorporateCustomer::where('phone_with_code', $input['phone_with_code'])
            ->update(['password' => $hashedPassword]);

        if ($updated) {
            return response()->json([
                'message' => 'Success',
                'status' => 1
            ]);
        } else {
            return response()->json([
                'message' => 'Sorry something went wrong',
                'status' => 0
            ]);
        }
    } */

    public function reset_password(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $options = [
            'cost' => 12,
        ];

        $hashedPassword = password_hash($input['password'], PASSWORD_DEFAULT, $options);

        $updated = CorporateCustomer::where('phone_with_code', $input['phone_with_code'])
            ->update(['password' => $hashedPassword]);

        if (!$updated) {
            $updated = CorporateAgent::where('phone_with_code', $input['phone_with_code'])
                ->update(['password' => $hashedPassword]);
        }

        if ($updated) {
            return response()->json([
                'message' => 'Password reset successful',
                'status' => 1
            ]);
        } else {
            return response()->json([
                'message' => 'Invalid phone number or something went wrong',
                'status' => 0
            ]);
        }
    }

    /*     public function forgot_password(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $customer = CorporateCustomer::where('phone_with_code', $input['phone_with_code'])->first();
        if (is_object($customer)) {
            $data['id'] = $customer->id;
            $otp = rand(1000, 9999);
            $data['otp'] = $otp;
            if (env('MODE') != 'DEMO') {
                $message = "Hi" . env('APP_NAME') . " , Your OTP code is:" . $otp;
                $this->sendSms($input['phone_with_code'], $message);
            }
            return response()->json([
                "result" => $data,
                "message" => 'Success',
                "status" => 1
            ]);
        } else {
            return response()->json([
                "message" => 'Please enter valid phone number',
                "status" => 0
            ]);
        }
    } */
    public function forgot_password(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'phone_with_code' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $user = CorporateCustomer::where('phone_with_code', $input['phone_with_code'])->first();
        $user_type = 'customer';

        if (!$user) {
            $user = CorporateAgent::where('phone_with_code', $input['phone_with_code'])->first();
            $user_type = 'agent';
        }

        if ($user) {
            $otp = rand(1000, 9999);
            $data = [
                'id' => $user->id,
                'otp' => $otp,
                'type' => $user_type
            ];

            if (env('MODE') != 'DEMO') {
                $message = "Hi " . env('APP_NAME') . ", Your OTP code is: " . $otp;
                $this->sendSms($input['phone_with_code'], $message);
            }

            return response()->json([
                "result" => $data,
                "message" => 'Success',
                "status" => 1
            ]);
        } else {
            return response()->json([
                "message" => 'Please enter valid phone number',
                "status" => 0
            ]);
        }
    }


    public function corporate_tutorials()
    {
        $data = DB::table('corporate_tutorials')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }
    public function update_company_details(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:corporate_customers,id',
            'company_name'        => 'sometimes|string|max:255',
            'registration_number' => 'sometimes|string|max:255',
            'vat_number'          => 'sometimes|string|max:255',
            'address'             => 'sometimes|string|max:500',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status'  => 0,
                'message' => $validator->errors()->first(),
            ]);
        }

        $customer = CorporateCustomer::find($request->id);

        if (!$customer) {
            return response()->json([
                'status'  => 0,
                'message' => 'Customer not found',
            ]);
        }

        $updateData = $request->only(['company_name', 'registration_number', 'vat_number', 'address']);
        if (!empty($updateData)) {
            $customer->update($updateData);
        }

        return response()->json([
            'status'  => 1,
            'message' => 'Company details updated successfully',
            'data'    => $customer->only(['company_name', 'registration_number', 'vat_number', 'address']),
        ]);
    }


    /*    public function group_create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'parent_id'              => 'nullable',
            'corporate_customer_id'  => 'nullable|exists:corporate_customers,id',
            'policy_id'              => 'required|exists:policies,id',
            'group_name'             => 'required|string|max:250|unique:groups,group_name',
            'group_description'      => 'nullable|string',
            'group_name_ar'          => 'nullable|string|max:250',
            'group_description_ar'   => 'nullable|string',
            'lang'                   => 'nullable|in:en,ar',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if (!empty($request->corporate_customer_id) && !empty($request->parent_id)) {
            $reviewer = CorporateCustomer::where('id', $request->corporate_customer_id)
                ->where('parent_id', $request->parent_id)
                ->first();

            if (!$reviewer) {
                return response()->json([
                    'status'  => 0,
                    'message' => 'Invalid reviewer for this parent',
                ]);
            }
        }

        $input['status'] = 1;

        $group = Group::create($input);

        return response()->json([
            'status'  => 1,
            'message' => 'Group created successfully',
            'result'  => $group,
        ]);
    } */

    public function group_create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'parent_id'             => 'nullable|exists:corporate_customers,id',
            'policy_id'             => 'required|exists:policies,id',
            'group_name'            => 'required|string|max:250|unique:groups,group_name',
            'group_description'     => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($request->parent_id) {
            $isValidParent = CorporateCustomer::where('id', $request->parent_id)
                ->where('parent_id', $request->corporate_customer_id)
                ->exists();

            if (!$isValidParent) {
                return response()->json([
                    'status'  => 0,
                    'message' => 'Invalid parent selected',
                ]);
            }
        }

        $group = Group::create([
            'corporate_customer_id' => $request->corporate_customer_id,
            'parent_id'             => $request->parent_id,
            'policy_id'             => $request->policy_id,
            'group_name'            => $request->group_name,
            'group_description'     => $request->group_description,
            'status'                => 1,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Group created successfully',
            'result'  => $group,
        ]);
    }

    public function group_delete(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'group_id' => 'required|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        Group::where('id', $request->group_id)->delete();

        return response()->json([
            'status'  => 1,
            'message' => 'Group deleted successfully',
        ]);
    }



    public function get_group(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'parent_id'             => 'nullable',
            'corporate_customer_id' => 'nullable|exists:corporate_customers,id',
            'lang'                  => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($request->lang == 'en') {

            $groups = DB::table('groups')
                ->leftJoin('corporate_customers as parent', 'parent.id', '=', 'groups.parent_id')
                ->leftJoin('corporate_customers', 'corporate_customers.id', '=', 'groups.corporate_customer_id')
                ->leftJoin('policies', 'policies.id', '=', 'groups.policy_id')
                ->when($request->parent_id, function ($q) use ($request) {
                    $q->where('groups.parent_id', $request->parent_id);
                })
                ->when($request->corporate_customer_id, function ($q) use ($request) {
                    $q->where('groups.corporate_customer_id', $request->corporate_customer_id);
                })
                ->select(
                    'groups.id',
                    'groups.group_name',
                    'groups.group_description',
                    'groups.parent_id',
                    DB::raw("
                    CASE 
                        WHEN groups.parent_id IS NULL OR groups.parent_id = 0 
                        THEN 'Admin' 
                        ELSE CONCAT(parent.first_name, ' ', parent.last_name) 
                    END AS parent_name
                "),
                    'groups.corporate_customer_id',
                    DB::raw("CONCAT(corporate_customers.first_name, ' ', corporate_customers.last_name) AS corporate_customer_name"),
                    'groups.policy_id',
                    'policies.title AS policy_name',
                    'groups.status'
                )
                ->get();
        } else {

            $groups = DB::table('groups')
                ->leftJoin('corporate_customers as parent', 'parent.id', '=', 'groups.parent_id')
                ->leftJoin('corporate_customers', 'corporate_customers.id', '=', 'groups.corporate_customer_id')
                ->leftJoin('policies', 'policies.id', '=', 'groups.policy_id')
                ->when($request->parent_id, function ($q) use ($request) {
                    $q->where('groups.parent_id', $request->parent_id);
                })
                ->when($request->corporate_customer_id, function ($q) use ($request) {
                    $q->where('groups.corporate_customer_id', $request->corporate_customer_id);
                })
                ->select(
                    'groups.id',
                    'groups.group_name_ar as group_name',
                    'groups.group_description_ar as group_description',
                    'groups.parent_id',
                    DB::raw("
                    CASE 
                        WHEN groups.parent_id IS NULL OR groups.parent_id = 0 
                        THEN 'Admin' 
                        ELSE CONCAT(parent.first_name, ' ', parent.last_name) 
                    END AS parent_name
                "),
                    'groups.corporate_customer_id',
                    DB::raw("CONCAT(corporate_customers.first_name, ' ', corporate_customers.last_name) AS corporate_customer_name"),
                    'groups.policy_id',
                    'policies.title_ar AS policy_name',
                    'groups.status'
                )
                ->get();
        }

        return response()->json([
            'status'  => 1,
            'message' => 'Success',
            'result'  => $groups,
        ]);
    }



    public function group_customers(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id'              => 'required|exists:groups,id',
            'parent_id'             => 'nullable',
            'corporate_customer_id' => 'nullable|exists:corporate_customers,id',
            'lang'                  => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($request->lang == 'en') {

            $customers = Customer::where('customers.group_id', $request->group_id)
                ->leftJoin('groups', 'groups.id', '=', 'customers.group_id')
                ->leftJoin('corporate_customers', 'corporate_customers.id', '=', 'groups.corporate_customer_id')
                ->leftJoin('policies', 'policies.id', '=', 'groups.policy_id');

            if ($request->filled('parent_id')) {
                $customers->where('groups.parent_id', $request->parent_id);
            }

            if ($request->filled('corporate_customer_id')) {
                $customers->where('groups.corporate_customer_id', $request->corporate_customer_id);
            }

            $customers = $customers->select(
                'customers.id',
                'customers.first_name',
                'customers.last_name',
                'customers.phone_number',
                'customers.email',
                'corporate_customers.first_name as corporate_customer_name',
                'policies.title as policy_title',
                'customers.group_id',
                'groups.corporate_customer_id'
            )->get();
        } else {

            $customers = Customer::where('customers.group_id', $request->group_id)
                ->leftJoin('groups', 'groups.id', '=', 'customers.group_id')
                ->leftJoin('corporate_customers', 'corporate_customers.id', '=', 'groups.corporate_customer_id')
                ->leftJoin('policies', 'policies.id', '=', 'groups.policy_id');

            if ($request->filled('parent_id')) {
                $customers->where('groups.parent_id', $request->parent_id);
            }

            if ($request->filled('corporate_customer_id')) {
                $customers->where('groups.corporate_customer_id', $request->corporate_customer_id);
            }

            $customers = $customers->select(
                'customers.id',
                'customers.first_name',
                'customers.last_name',
                'customers.phone_number',
                'customers.email',
                'corporate_customers.first_name as corporate_customer_name',
                'policies.title_ar as policy_title',
                'customers.group_id',
                'groups.corporate_customer_id'
            )->get();
        }

        if ($customers->isEmpty()) {
            return response()->json([
                'status'  => 0,
                'message' => 'No customers found in this group.',
                'result'  => [],
            ]);
        }

        return response()->json([
            'status'  => 1,
            'message' => 'Customers fetched successfully.',
            'result'  => $customers,
        ]);
    }

    public function group_update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'group_id'               => 'required|exists:groups,id',
            'parent_id'              => 'nullable',
            'corporate_customer_id'  => 'nullable|exists:corporate_customers,id',
            'policy_id'              => 'nullable|exists:policies,id',
            'group_name'             => 'nullable|string|max:250|unique:groups,group_name,' . $request->group_id,
            'group_description'      => 'nullable|string',
            'group_name_ar'          => 'nullable|string|max:250',
            'group_description_ar'   => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $group = Group::find($request->group_id);

        if (!$group) {
            return response()->json([
                'status'  => 0,
                'message' => 'Group not found',
            ]);
        }
        if ($request->filled('corporate_customer_id') && $request->filled('parent_id')) {
            $reviewer = CorporateCustomer::where('id', $request->corporate_customer_id)
                ->where('parent_id', $request->parent_id)
                ->first();

            if (!$reviewer) {
                return response()->json([
                    'status'  => 0,
                    'message' => 'Invalid reviewer for this parent',
                ]);
            }
        }

        $group->update($request->only([
            'corporate_customer_id',
            'policy_id',
            'parent_id',
            'group_name',
            'group_description',
            'group_name_ar',
            'group_description_ar',
        ]));

        return response()->json([
            'status'  => 1,
            'message' => 'Group updated successfully',
            'result'  => $group,
        ]);
    }




    public function ride_list(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $dat = Trip::where('corporate_customer_id', $input['corporate_customer_id'])->get();
        $j = 0;
        if (sizeof($dat) > 0) {
            foreach ($dat as $data) {
                $dar = Trip::where('id', $data->id)->first();
                $trip[$j]['id'] = $dar->id;
                $trip[$j]['trip_id'] = $dar->trip_id;
                $trip[$j]['pickup_date'] = $dar->pickup_date;
                $trip[$j]['pickup_time'] = $dar->pickup_time;
                $trip[$j]['pickup_location_address'] = $dar->pickup_location_address;
                $trip[$j]['drop_location_address'] = $dar->drop_location_address;
                $trip[$j]['vehicle_id'] = $dar->vehicle - id;
                $trip[$j]['total'] = $dar->total;
                $trip[$j]['status'] = $dar->status;
                $driver_vehicle = DriverVehicle::where('id', $dar->vehicle - id)->where('driver_id', $dar->driver - id)->first();
                $trip[$j]['vehicle_brand'] = $driver_vehicle['brand'];
                $trip[$j]['vehicle_color'] = $driver_vehicle['color'];
                $trip[$j]['vehicle_name'] = $driver_vehicle['vehicle_name'];
                $trip[$j]['vehicle_number'] = $driver_vehicle['vehicle_number'];
                $trip[$j]['vehicle_type'] = VehicleCategory::where('id', $dar->vehicle_type)->where('country_id', $input['country_id'])->value('vehicle_type');
                $j++;
            }
            return response()->json([
                "result" => $trip,
                "message" => 'Success',
                "status" => 1
            ]);
        } else {
            return response()->json([
                "message" => 'No trips found',
                "status" => 0
            ]);
        }
    }


    public function corporate_customer_list(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $request->corporate_customer_id;

        $customers = Customer::where('customers.corporate_customer_id', $corporate_customer_id)
            ->leftJoin('groups', 'groups.id', '=', 'customers.group_id')
            ->select(
                'customers.id',
                'customers.first_name',
                'customers.last_name',
                'customers.email',
                'customers.phone_number',
                'customers.referral_code',
                'customers.phone_with_code',
                'customers.wallet',
                'customers.group_id',
                'groups.group_name',
                'groups.group_description',
                'groups.group_name_ar',
                'groups.group_description_ar',
                'customers.status',
                'customers.created_at'
            )
            ->orderBy('customers.id', 'desc')
            ->get();

        if ($customers->isEmpty()) {
            return response()->json([
                'status' => 0,
                'message' => 'No customers found for this corporate customer.',
                'result' => [],
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Customer list fetched successfully.',
            'result' => $customers,
        ]);
    }


    public function corporate_bookings(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'date_filter' => 'nullable',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $input['corporate_customer_id'];
        $lang = $input['lang'];
        $filter = $input['filter'];
        $date_filter = $input['date_filter'] ?? 'all_time';
        $group_id = $input['group_id'] ?? null;

        $agent_ids = DB::table('corporate_agents')
            ->where('corporate_customer_id', $corporate_customer_id)
            ->pluck('id')
            ->toArray();
        $query = DB::table('trips')
            ->leftJoin('customers', 'customers.id', '=', 'trips.customer_id')
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('trip_types', 'trip_types.id', '=', 'trips.trip_type')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'driver_vehicles.vehicle_type')
            ->leftJoin('booking_statuses', 'booking_statuses.id', '=', 'trips.status')
            ->leftJoin('trip_cancellations', 'trip_cancellations.trip_id', '=', 'trips.id')
            ->leftJoin('cancellation_reasons', 'cancellation_reasons.id', '=', 'trip_cancellations.reason_id')
            ->where('trips.corporate_customer_id', $corporate_customer_id);

        if ($group_id) {
            $query->where('customers.group_id', $group_id);
        }

        $now = Carbon::now('Asia/Kolkata');
        if ($date_filter == 'today') {
            $query->whereDate('trips.pickup_date', $now->toDateString());
        } elseif ($date_filter == 'week') {
            $query->whereBetween('trips.pickup_date', [$now->startOfWeek(), $now->endOfWeek()]);
        } elseif ($date_filter == 'month') {
            $query->whereMonth('trips.pickup_date', $now->month)
                ->whereYear('trips.pickup_date', $now->year);
        }

        if ($lang == 'en') {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type',
                'cancellation_reasons.reason',
                'trips.agent_name',
                'trips.agent_phone_number'
            );
        } else {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment_ar as payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name_ar as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type_ar as vehicle_type',
                'trips.agent_name',
                'trips.agent_phone_number'
            );
        }

        if ($filter == 1) {
            $query->whereIn('trips.status', [1, 2, 3, 4, 5, 6, 7]);
        } elseif ($filter == 2) {
            $query->whereIn('trips.status', [1, 2, 3, 4]);
        } elseif ($filter == 3) {
            $query->whereIn('trips.status', [5]);
        }

        $data = $query->orderBy('trips.id', 'DESC')->get();

        $groups = DB::table('customers')
            ->where('corporate_customer_id', $corporate_customer_id)
            ->join('groups', 'groups.id', '=', 'customers.group_id')
            ->distinct()
            ->select('groups.id', 'groups.group_name')
            ->get();

        return response()->json([
            "result" => $data,
            "groups" => $groups,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function corporate_bookings_today(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', $now);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }

    public function corporate_bookings_future(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', '>', $now);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }

    public function corporate_bookings_past(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', '<', $now);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }

    private function corporateBookingBaseQuery($input)
    {
        $corporate_customer_id = $input['corporate_customer_id'];
        $lang = $input['lang'];
        $filter = $input['filter'];
        $group_id = $input['group_id'] ?? null;

        $query = DB::table('trips')
            ->leftJoin('customers', 'customers.id', '=', 'trips.customer_id')
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('trip_types', 'trip_types.id', '=', 'trips.trip_type')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'driver_vehicles.vehicle_type')
            ->leftJoin('booking_statuses', 'booking_statuses.id', '=', 'trips.status')
            ->leftJoin('trip_cancellations', 'trip_cancellations.trip_id', '=', 'trips.id')
            ->leftJoin('cancellation_reasons', 'cancellation_reasons.id', '=', 'trip_cancellations.reason_id')
            ->where('trips.corporate_customer_id', $corporate_customer_id);

        if ($group_id) {
            $query->where('customers.group_id', $group_id);
        }

        if ($lang == 'en') {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type',
                'cancellation_reasons.reason',
                'trips.agent_name',
                'trips.agent_phone_number',
                'trips.driver_note',
                'trips.customer_note',
                'trips.company_name'
            );
        } else {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment_ar as payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name_ar as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type_ar as vehicle_type',
                'trips.agent_name',
                'trips.agent_phone_number',
                'trips.driver_note',
                'trips.customer_note',
                'trips.company_name'

            );
        }

        if ($filter == 1) {
            $query->whereIn('trips.status', [1, 2, 3, 4, 5, 6, 7]);
        } elseif ($filter == 2) {
            $query->whereIn('trips.status', [1, 2, 3, 4]);
        } elseif ($filter == 3) {
            $query->whereIn('trips.status', [5]);
        }

        return $query->orderBy('trips.id', 'DESC');
    }
    private function corporateBookingFinalResponse($query, $corporate_customer_id)
    {
        $data = $query->get();

        $groups = DB::table('customers')
            ->join('groups', 'groups.id', '=', 'customers.group_id')
            ->where('customers.corporate_customer_id', $corporate_customer_id)
            ->distinct()
            ->select('groups.id', 'groups.group_name')
            ->get();


        return response()->json([
            "result" => $data,
            "groups" => $groups,
            "message" => "Success",
            "status" => 1
        ]);
    }


    public function corporate_trip_requests(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'date_filter' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $request->corporate_customer_id;
        $date_filter = $request->date_filter ?? 'all_time';

        $trips = DB::table('trip_requests')
            ->leftJoin('customers', 'customers.id', '=', 'trip_requests.customer_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'trip_requests.vehicle_type')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trip_requests.payment_method')
            ->leftJoin('promo_codes', 'promo_codes.id', '=', 'trip_requests.promo')
            ->leftJoin('trip_request_statuses', 'trip_request_statuses.id', '=', 'trip_requests.status')
            ->select(
                'trip_requests.id',
                'trip_requests.corporate_customer_id',
                'customers.first_name as customer_name',
                'trip_requests.distance',
                'vehicle_categories.vehicle_type',
                'trip_requests.pickup_address',
                'trip_requests.drop_address',
                'payment_methods.payment as payment_method',
                'trip_requests.total',
                'trip_requests.sub_total',
                'promo_codes.promo_code',
                'trip_requests.discount',
                'trip_requests.tax',
                'trip_requests.surge',
                'trip_request_statuses.status as trip_status',
                'trip_requests.created_at'
            )
            ->where('trip_requests.corporate_customer_id', $corporate_customer_id);

        $now = Carbon::now('Asia/Kolkata');
        if ($date_filter == 'today') {
            $trips->whereDate('trip_requests.pickup_date', $now->toDateString());
        } elseif ($date_filter == 'week') {
            $trips->whereBetween('trip_requests.pickup_date', [$now->startOfWeek(), $now->endOfWeek()]);
        } elseif ($date_filter == 'month') {
            $trips->whereMonth('trip_requests.pickup_date', $now->month)
                ->whereYear('trip_requests.pickup_date', $now->year);
        }

        $trips = $trips->orderBy('trip_requests.id', 'desc')->get();

        if ($trips->isEmpty()) {
            return response()->json([
                'status' => 0,
                'message' => 'No trip requests found for this corporate customer.',
                'result' => [],
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Trip request list fetched successfully.',
            'result' => $trips,
        ]);
    }

    public function corporate_bookings_today_by_trip(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'trip_id' => 'required|exists:trips,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', $now)
            ->where('trips.id', $input['trip_id']);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }

    public function corporate_bookings_future_by_trip(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'trip_id' => 'required|exists:trips,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', '>', $now)
            ->where('trips.id', $input['trip_id']);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }


    public function corporate_bookings_past_by_trip(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'trip_id' => 'required|exists:trips,id',
            'lang' => 'required',
            'filter' => 'required',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $now = Carbon::now('Asia/Kolkata')->toDateString();

        $query = $this->corporateBookingBaseQuery($input)
            ->whereDate('trips.pickup_date', '<', $now)
            ->where('trips.id', $input['trip_id']);

        return $this->corporateBookingFinalResponse($query, $input['corporate_customer_id']);
    }


    public function create_policy(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title'              => 'required',
            'short_description'  => 'required',
            'long_description'   => 'required',
            'corporate_customer_id'   => 'required',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $policy = Policy::create([
            'title'             => $request->title,
            'short_description' => $request->short_description,
            'long_description'  => $request->long_description,
            'corporate_customer_id'  => $request->corporate_customer_id,
            'status'                 => 1,
        ]);

        return response()->json([
            'status'  => 1,
            'message' => 'Policy created successfully.',
            'result'  => $policy,
        ]);
    }

    public function delete_policy(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'policy_id' => 'required|exists:policies,id',
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $policy = Policy::find($request->policy_id);
        if (!$policy) {
            return response()->json([
                'status'  => 0,
                'message' => 'Policy not found',
            ]);
        }
        $policy->delete();
        return response()->json([
            'status'  => 1,
            'message' => 'Policy deleted successfully.',
        ]);
    }

    public function update_policy(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'policy_id' => 'required|exists:policies,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $policy = Policy::find($request->policy_id);
        if (!$policy) {
            return response()->json([
                'status' => 0,
                'message' => 'Policy not found',
            ]);
        }
        if ($request->filled('title')) {
            $policy->title = $request->title;
        }

        if ($request->filled('short_description')) {
            $policy->short_description = $request->short_description;
        }

        if ($request->filled('long_description')) {
            $policy->long_description = $request->long_description;
        }

        if ($request->filled('corporate_customer_id')) {
            $policy->corporate_customer_id = $request->corporate_customer_id;
        }

        if ($request->filled('status')) {
            $policy->status = $request->status;
        }

        $policy->save();

        return response()->json([
            'status'  => 1,
            'message' => 'Policy updated successfully.',
            'result'  => $policy,
        ]);
    }


    public function get_policies(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($input['lang'] == 'en') {

            $policies = Policy::select(
                'id',
                'title',
                'short_description',
                'long_description',
                'corporate_customer_id',
                'status'
            )
                ->where('corporate_customer_id', $input['corporate_customer_id'])
                ->where('status', 1)
                ->orderBy('id', 'desc')
                ->get();
        } else {

            $policies = Policy::select(
                'id',
                'title_ar as title',
                'short_description_ar as short_description',
                'long_description_ar as long_description',
                'corporate_customer_id',
                'status'
            )
                ->where('corporate_customer_id', $input['corporate_customer_id'])
                ->where('status', 1)
                ->orderBy('id', 'desc')
                ->get();
        }

        if ($policies->isEmpty()) {
            return response()->json([
                'status' => 0,
                'message' => 'No Policy found for this corporate customer.',
                'result' => [],
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Policy list fetched successfully.',
            'result' => $policies,
        ]);
    }



    /*   public function corporate_dashboard(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|integer',
            'user_type' => 'nullable|string|in:customer,agent',
            'period' => 'nullable|string|in:this_week,this_month,last_month,this_quarter,this_year',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $request->corporate_customer_id;
        $period = $request->period ?? 'last_month';
        $user_type = $request->user_type ?? null;

        if ($user_type === 'agent') {
            $user = CorporateAgent::find($corporate_customer_id);
        } else {
            $user = CorporateCustomer::find($corporate_customer_id);
            $user_type = 'customer';
        }

        if (!$user) {
            return response()->json([
                'status' => 0,
                'message' => 'Invalid corporate_customer_id for selected type',
            ]);
        }

        $now = now();

        switch ($period) {
            case 'this_week':
                $start = $now->startOfWeek()->toDateString();
                $end = $now->endOfWeek()->toDateString();
                break;
            case 'this_month':
                $start = $now->startOfMonth()->toDateString();
                $end = $now->endOfMonth()->toDateString();
                break;
            case 'last_month':
                $start = $now->copy()->subMonth()->startOfMonth()->toDateString();
                $end = $now->copy()->subMonth()->endOfMonth()->toDateString();
                break;
            case 'this_quarter':
                $quarter = ceil($now->month / 3);
                $startMonth = ($quarter - 1) * 3 + 1;
                $start = $now->copy()->month($startMonth)->startOfMonth()->toDateString();
                $end = $now->copy()->month($startMonth + 2)->endOfMonth()->toDateString();
                break;
            case 'this_year':
                $start = $now->startOfYear()->toDateString();
                $end = $now->endOfYear()->toDateString();
                break;
            default:
                $start = $now->copy()->subMonth()->startOfMonth()->toDateString();
                $end = $now->copy()->subMonth()->endOfMonth()->toDateString();
        }

        if ($user_type === 'customer' || $user_type === 'agent') {
            $query = TripRequest::where('corporate_customer_id', $corporate_customer_id);
        } else {
            $query = TripRequest::where('corporate_agent_id', $corporate_customer_id);
        }

        $stats = $query->whereBetween('pickup_date', [$start . ' 00:00:00', $end . ' 23:59:59'])
            ->selectRaw('
            COUNT(*) as total_rides,
            SUM(distance) as total_distance,
            SUM(total) as total_spent
        ')
            ->first();

        return response()->json([
            'status' => 1,
            'message' => 'Dashboard stats fetched successfully',
            'result' => [
                'type' => ucfirst($user_type),
                'name' => $user->first_name ?? '-',
                'total_rides' => $stats->total_rides ?? 0,
                'total_distance' => $stats->total_distance ?? 0,
                'total_spent' => number_format($stats->total_spent ?? 0, 2, '.', ''),
                'period' => ucfirst(str_replace('_', ' ', $period)) . " ($start - $end)",
            ],
        ]);
    } */

    private function dashboardTranslations($lang = 'en')
    {
        return [
            'en' => [
                'message' => 'Corporate dashboard stats fetched successfully',
                'this_week' => 'This week',
                'this_month' => 'This month',
                'last_month' => 'Last month',
                'this_quarter' => 'This quarter',
                'this_year' => 'This year',
            ],
            'sw' => [
                'message' => 'Takwimu za dashibodi ya kampuni zimepatikana kwa mafanikio',
                'this_week' => 'Wiki hii',
                'this_month' => 'Mwezi huu',
                'last_month' => 'Mwezi uliopita',
                'this_quarter' => 'Robo hii',
                'this_year' => 'Mwaka huu',
            ],
        ];
    }

    public function corporate_dashboard(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|integer',
            'user_type' => 'required|string|in:corporate,customer',
            'period' => 'nullable|string|in:this_week,this_month,last_month,this_quarter,this_year',
            'lang' => 'nullable|string|in:en,sw',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $lang = $request->input('lang', 'en');

        $allTranslations = $this->dashboardTranslations();
        $translations = $allTranslations[$lang] ?? $allTranslations['en'];


        $corporateCustomerId = $request->input('corporate_customer_id');
        $userType = $request->input('user_type');
        $period = $request->input('period') ?? 'this_month';
        $now = now();

        // 📅 Period filter
        switch ($period) {
            case 'this_week':
                $start = $now->copy()->startOfWeek()->startOfDay();
                $end = $now->copy()->endOfWeek()->endOfDay();
                break;
            case 'this_month':
                $start = $now->copy()->startOfMonth()->startOfDay();
                $end = $now->copy()->endOfMonth()->endOfDay();
                break;
            case 'last_month':
                $start = $now->copy()->subMonth()->startOfMonth()->startOfDay();
                $end = $now->copy()->subMonth()->endOfMonth()->endOfDay();
                break;
            case 'this_quarter':
                $quarter = ceil($now->month / 3);
                $startMonth = ($quarter - 1) * 3 + 1;
                $start = $now->copy()->month($startMonth)->startOfMonth()->startOfDay();
                $end = $now->copy()->month($startMonth + 2)->endOfMonth()->endOfDay();
                break;
            case 'this_year':
                $start = $now->copy()->startOfYear()->startOfDay();
                $end = $now->copy()->endOfYear()->endOfDay();
                break;
            default:
                $start = $now->copy()->startOfMonth()->startOfDay();
                $end = $now->copy()->endOfMonth()->endOfDay();
        }

        // 🧠 Build query
        $query = DB::table('trips')->whereBetween('pickup_date', [$start, $end]);

        if ($userType === 'corporate') {
            // Only trips directly under that corporate_customer_id
            $query->where('corporate_customer_id', $corporateCustomerId);
        } elseif ($userType === 'customer') {
            // All trips of agents under that corporate_customer_id
            $agentIds = DB::table('corporate_agents')
                ->where('corporate_customer_id', $corporateCustomerId)
                ->pluck('id');

            if ($agentIds->isNotEmpty()) {
                $query->whereIn('corporate_customer_id', $agentIds);
            } else {
                // If no agents found, force empty result
                $query->whereNull('corporate_customer_id');
            }
        }

        $data = $query->select(
            DB::raw('COUNT(*) as total_rides'),
            DB::raw('COALESCE(SUM(distance),0) as total_distance'),
            DB::raw('COALESCE(SUM(total),0) as total_spent')
        )->first();

        return response()->json([
            'status' => true,
            'message' => $translations['message'],
            'result' => [
                'total_rides' => $data->total_rides ?? 0,
                'total_distance' => $data->total_distance ?? 0,
                'total_spent' => number_format($data->total_spent ?? 0, 2, '.', ''),
                'period' => ($translations[$period] ?? $period)
                    . " ({$start->toDateString()} - {$end->toDateString()})",
            ],
        ]);
    }


    /* public function corporate_monthly_settlement(Request $request)
    {
        $corporateId = $request->input('corporate_customer_id');

        $now = Carbon::now('Asia/Kolkata');
        $previousStart = $now->copy()->subMonth()->startOfMonth()->startOfDay();
        $previousEnd = $now->copy()->subMonth()->endOfMonth()->endOfDay();
        $currentStart = $now->copy()->startOfMonth()->startOfDay();
        $currentEnd = $now->copy()->endOfMonth()->endOfDay();

        $corporatesQuery = DB::table('corporate_customers')
            ->select('id', 'first_name', 'company_name');
        if ($corporateId) {
            $corporatesQuery->where('id', $corporateId);
        }
        $corporates = $corporatesQuery->get();

        if ($corporates->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No corporate customers found',
                'data' => []
            ]);
        }

        $tripData = DB::table('trips')
            ->join('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->select(
                'corporate_agents.corporate_customer_id as real_corporate_id',
                DB::raw('SUM(trips.sub_total) as total_sub_total'),
                DB::raw('SUM(trips.total) as total_total'),
                DB::raw('SUM(trips.tax) as total_tax'),
                DB::raw("DATE_FORMAT(trips.pickup_date, '%Y-%m-01') as period_start")
            )
            ->where('trips.status', 5)
            ->whereBetween('trips.pickup_date', [$previousStart, $currentEnd])
            ->groupBy('real_corporate_id', DB::raw("DATE_FORMAT(trips.pickup_date, '%Y-%m-01')"))
            ->get();

        $tripLookup = [];
        foreach ($tripData as $row) {
            $key = $row->real_corporate_id . '-' . $row->period_start;
            $tripLookup[$key] = $row;
        }

        foreach ($corporates as $corp) {
            foreach ([$previousStart, $currentStart] as $periodStart) {
                $key = $corp->id . '-' . $periodStart->format('Y-m-01');
                $data = $tripLookup[$key] ?? null;

                $sub_total = $data->total_sub_total ?? 0;
                $total = $data->total_total ?? 0;
                $tax = $data->total_tax ?? 0;

                DB::table('payment_statements')->updateOrInsert(
                    [
                        'corporate_customer_id' => $corp->id,
                        'payment_period' => $periodStart->format('Y-m-01'),
                    ],
                    [
                        'sub_total' => $sub_total,
                        'total' => $total,
                        'tax' => $tax,
                        'status' => 0,
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );
            }
        }

        $statementsQuery = DB::table('corporate_customers')
            ->leftJoin('payment_statements', 'corporate_customers.id', '=', 'payment_statements.corporate_customer_id')
            ->select(
                'payment_statements.id as payment_statement_id',
                'corporate_customers.id',
                'corporate_customers.first_name',
                'corporate_customers.company_name',
                'payment_statements.payment_period',
                'payment_statements.sub_total',
                'payment_statements.total',
                'payment_statements.tax',
                DB::raw("CASE 
                WHEN payment_statements.status = 0 THEN 'Initiated'
                WHEN payment_statements.status = 1 THEN 'Processing'
                WHEN payment_statements.status = 2 THEN 'Approved'
                ELSE 'No Statement'
            END as status")
            )
            ->whereBetween('payment_statements.payment_period', [
                $previousStart->format('Y-m-01'),
                $currentStart->format('Y-m-01')
            ])
            ->orderBy('corporate_customers.first_name', 'asc')
            ->orderBy('payment_statements.payment_period', 'desc');

        if ($corporateId) {
            $statementsQuery->where('corporate_customers.id', $corporateId);
        }

        $statements = $statementsQuery->get()->map(function ($item) {
            if ($item->payment_period) {
                $start = Carbon::parse($item->payment_period)->startOfMonth()->format('M j');
                $end   = Carbon::parse($item->payment_period)->startOfMonth()->endOfMonth()->format('M j, Y');
                $item->payment_period = "{$start} - {$end}";
            }
            return $item;
        });

        return response()->json([
            'status' => true,
            'message' => 'Payment statements recalculated and updated for completed trips (status = 5)',
            'data' => $statements
        ]);
    }
 */

    public function corporate_monthly_settlement(Request $request)
    {
        $corporateId = $request->input('corporate_customer_id');

        $now = Carbon::now('Asia/Kolkata');
        $previousStart = $now->copy()->subMonth()->startOfMonth()->startOfDay();
        $currentStart = $now->copy()->startOfMonth()->startOfDay();
        $currentEnd = $now->copy()->endOfMonth()->endOfDay();

        // Get corporate list
        $corporatesQuery = DB::table('corporate_customers')
            ->select('id', 'first_name', 'company_name');
        if ($corporateId) {
            $corporatesQuery->where('id', $corporateId);
        }
        $corporates = $corporatesQuery->get();

        if ($corporates->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'No corporate customers found',
                'data' => []
            ]);
        }

        // Get default service fee from trip_settings
        $defaultServiceFee = DB::table('trip_settings')->value('service_fee') ?? 0;

        // Aggregate trip data
        $tripData = DB::table('trips')
            ->join('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->select(
                'corporate_agents.corporate_customer_id as real_corporate_id',
                DB::raw('SUM(trips.sub_total) as total_sub_total'),
                DB::raw('SUM(trips.tax) as total_tax'),
                DB::raw("DATE_FORMAT(trips.pickup_date, '%Y-%m-01') as period_start")
            )
            ->where('trips.status', 5)
            ->whereBetween('trips.pickup_date', [$previousStart, $currentEnd])
            ->groupBy('real_corporate_id', DB::raw("DATE_FORMAT(trips.pickup_date, '%Y-%m-01')"))
            ->get();

        // Prepare lookup for quick access
        $tripLookup = [];
        foreach ($tripData as $row) {
            $key = $row->real_corporate_id . '-' . $row->period_start;
            $tripLookup[$key] = $row;
        }

        // Update or insert payment statements
        foreach ($corporates as $corp) {
            foreach ([$previousStart, $currentStart] as $periodStart) {
                $key = $corp->id . '-' . $periodStart->format('Y-m-01');
                $data = $tripLookup[$key] ?? null;

                $sub_total = $data->total_sub_total ?? 0;
                $tax = $data->total_tax ?? 0;
                $service_fee = $defaultServiceFee; // always use default from trip_settings
                $total = $sub_total + $tax + $service_fee;

                DB::table('payment_statements')->updateOrInsert(
                    [
                        'corporate_customer_id' => $corp->id,
                        'payment_period' => $periodStart->format('Y-m-01'),
                    ],
                    [
                        'sub_total' => $sub_total,
                        'tax' => $tax,
                        'service_fee' => $service_fee,
                        'total' => $total,
                        'updated_at' => now(),
                        'created_at' => now(),
                    ]
                );
            }
        }

        // Fetch updated payment statements
        $statementsQuery = DB::table('corporate_customers')
            ->leftJoin('payment_statements', 'corporate_customers.id', '=', 'payment_statements.corporate_customer_id')
            ->select(
                'payment_statements.id as payment_statement_id',
                'corporate_customers.id',
                'corporate_customers.first_name',
                'corporate_customers.company_name',
                'payment_statements.payment_period',
                'payment_statements.sub_total',
                'payment_statements.tax',
                'payment_statements.service_fee',
                'payment_statements.total',
                DB::raw("CASE 
                WHEN payment_statements.status = 0 THEN 'Initiated'
                WHEN payment_statements.status = 1 THEN 'Processing'
                WHEN payment_statements.status = 2 THEN 'Approved'
                ELSE 'No Statement'
            END as status")
            )
            ->whereBetween('payment_statements.payment_period', [
                $previousStart->format('Y-m-01'),
                $currentStart->format('Y-m-01')
            ])
            ->orderBy('corporate_customers.first_name', 'asc')
            ->orderBy('payment_statements.payment_period', 'desc');

        if ($corporateId) {
            $statementsQuery->where('corporate_customers.id', $corporateId);
        }

        $statements = $statementsQuery->get()->map(function ($item) {
            if ($item->payment_period) {
                $start = Carbon::parse($item->payment_period)->startOfMonth()->format('M j');
                $end   = Carbon::parse($item->payment_period)->startOfMonth()->endOfMonth()->format('M j, Y');
                $item->payment_period = "{$start} - {$end}";
            }
            return $item;
        });

        return response()->json([
            'status' => true,
            'message' => 'Payment statements recalculated and updated for completed trips (status = 5)',
            'data' => $statements
        ]);
    }



    public function register(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:corporate_customers,email',
            'username' => 'required|string|unique:corporate_customers,username',
            'password' => 'required|min:6',
            'phone_number' => 'required|string|max:20|unique:corporate_customers,phone_number',
            'phone_with_code' => 'required|string|max:20',
            'company_name' => 'required|string|max:255',
            'designation' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'registration_number' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $customer = new CorporateCustomer();
        $customer->first_name = $input['first_name'];
        $customer->last_name = $input['last_name'];
        $customer->email = $input['email'];
        $customer->username = $input['username'];
        $customer->password = Hash::make($input['password']);
        $customer->phone_number = $input['phone_number'];
        $customer->phone_with_code = $input['phone_with_code'];
        $customer->company_name = $input['company_name'];
        $customer->designation = $input['designation'];
        $customer->registration_number = $input['registration_number'] ?? null;
        $customer->address = $input['address'];
        $customer->status = 1;


        $customer->parent_id = $input['parent_id'] ?? 0;

        if ($request->hasFile('profile_picture')) {
            $path = $request->file('profile_picture')->store('corporate_customers', 'public');
            $customer->profile_picture = $path;
        }

        $customer->save();

        return response()->json([
            'status' => 1,
            'message' => 'Corporate Customer registered successfully',
            'result' => [
                'id' => $customer->id,
                'first_name' => $customer->first_name,
                'last_name' => $customer->last_name,
                'email' => $customer->email,
                'username' => $customer->username,
                'phone_number' => $customer->phone_number,
                'phone_with_code' => $customer->phone_with_code,
                'company_name' => $customer->company_name,
                'designation' => $customer->designation,
                'parent_id' => $customer->parent_id,
                'profile_picture' => $customer->profile_picture ? asset('storage/' . $customer->profile_picture) : null,
            ],
        ]);
    }

    public function corporate_customer_admin_list(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'parent_id' => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $parentId = $input['parent_id'];

        $corporateCustomers = CorporateCustomer::where('parent_id', $parentId)
            ->orderBy('id', 'desc')
            ->select(
                'id',
                'first_name',
                'last_name',
                'company_name',
                'email',
                'phone_number',
                'phone_with_code',
                'username',
                'profile_picture',
                'designation',
                'address',
                'status',
                'parent_id',
                'created_at'
            )
            ->get();

        if ($corporateCustomers->isEmpty()) {
            return response()->json([
                'status' => 0,
                'message' => 'No corporate customers found for this parent.',
                'result' => [],
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Corporate customer list fetched successfully.',
            'result' => $corporateCustomers,
        ]);
    }

    public function getCorporateTrips(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $request->corporate_customer_id;

        $trips = Trip::where('corporate_customer_id', $corporate_customer_id)
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($trip) {
                return [
                    'id' => $trip->id,
                    'customer_name' => $trip->customer_id
                        ? optional(Customer::find($trip->customer_id))->first_name
                        : $trip->customer_name,
                    'corporate_customer_id' => $trip->corporate_customer_id,
                    'distance' => $trip->km,
                    'vehicle_type' => $trip->vehicle_type,
                    'pickup_address' => $trip->pickup_address,
                    'drop_address' => $trip->drop_address,
                    'payment_method' => $trip->payment_method ?? null,
                    'surge' => $trip->surge,
                    'total' => $trip->total,
                    'sub_total' => $trip->sub_total,
                    'promo' => $trip->promo ?? 0,
                    'discount' => $trip->discount,
                    'tax' => $trip->tax,
                    'status' => $trip->status,
                    'booking_type' => $trip->booking_type,
                    'pickup_date' => $trip->pickup_date,
                ];
            });

        return response()->json([
            'status' => 1,
            'message' => 'Trips fetched successfully',
            'data' => $trips
        ]);
    }

    public function getCorporateCustomerTrips(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'status' => 0,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ]);
        }

        $corporate_customer_id = $request->corporate_customer_id;

        // Get trips for all customers under this corporate customer
        $trips = Trip::whereHas('customer', function ($query) use ($corporate_customer_id) {
            $query->where('corporate_customer_id', $corporate_customer_id);
        })->with('customer') // eager load customer
            ->orderBy('id', 'desc')
            ->get()
            ->map(function ($trip) {
                return [
                    'trip_id' => $trip->id,
                    'customer_id' => $trip->customer_id,
                    'customer_name' => $trip->customer ? $trip->customer->first_name . ' ' . $trip->customer->last_name : 'Guest',
                    'vehicle_type' => $trip->vehicle_type,
                    'pickup_address' => $trip->pickup_address,
                    'drop_address' => $trip->drop_address,
                    'distance' => $trip->km,
                    'total_fare' => $trip->total,
                    'status' => $trip->status,
                    'pickup_date' => $trip->pickup_date,
                    // add any other trip fields you need
                ];
            });

        return response()->json([
            'status' => 1,
            'message' => 'Trips fetched successfully',
            'data' => $trips
        ]);
    }


    public function bookings_list(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'date_filter' => 'nullable',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $input['corporate_customer_id'];
        $lang = $input['lang'];
        $filter = $input['filter'];
        $date_filter = $input['date_filter'] ?? 'all_time';
        $group_id = $input['group_id'] ?? null;

        $customer_ids_query = DB::table('customers')
            ->where('corporate_customer_id', $corporate_customer_id);
        if ($group_id) {
            $customer_ids_query->where('group_id', $group_id);
        }
        $customer_ids = $customer_ids_query->pluck('id')->toArray();

        $query = DB::table('trips')
            ->leftJoin('customers', 'customers.id', '=', 'trips.customer_id')
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('trip_types', 'trip_types.id', '=', 'trips.trip_type')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'driver_vehicles.vehicle_type')
            ->leftJoin('booking_statuses', 'booking_statuses.id', '=', 'trips.status')
            ->leftJoin('trip_cancellations', 'trip_cancellations.trip_id', '=', 'trips.id')
            ->leftJoin('cancellation_reasons', 'cancellation_reasons.id', '=', 'trip_cancellations.reason_id')
            ->whereIn('trips.customer_id', $customer_ids);

        $now = Carbon::now('Asia/Kolkata');
        if ($date_filter == 'today') {
            $query->whereDate('trips.pickup_date', $now->toDateString());
        } elseif ($date_filter == 'week') {
            $query->whereBetween('trips.pickup_date', [$now->startOfWeek(), $now->endOfWeek()]);
        } elseif ($date_filter == 'month') {
            $query->whereMonth('trips.pickup_date', $now->month)
                ->whereYear('trips.pickup_date', $now->year);
        }

        if ($lang == 'en') {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'customers.corporate_customer_id as corporate_customer_id',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type',
                'cancellation_reasons.reason'
            );
        } else {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'customers.corporate_customer_id as corporate_customer_id',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment_ar as payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name_ar as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type_ar as vehicle_type',
                'cancellation_reasons.reason'
            );
        }

        if ($filter == 1) {
            $query->whereIn('trips.status', [1, 2, 3, 4, 5, 6, 7]);
        } elseif ($filter == 2) {
            $query->whereIn('trips.status', [1, 2, 3, 4]);
        } elseif ($filter == 3) {
            $query->whereIn('trips.status', [5]);
        }

        $data = $query->orderBy('trips.id', 'DESC')->get();

        $groups = DB::table('customers')
            ->join('groups', 'groups.id', '=', 'customers.group_id')
            ->where('customers.corporate_customer_id', $corporate_customer_id)
            ->distinct()
            ->select('groups.id', 'groups.group_name')
            ->get();


        return response()->json([
            "result" => $data,
            "groups" => $groups,
            "message" => 'Success',
            "status" => 1
        ]);
    }


    public function get_corporate_booking(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'date_filter' => 'nullable',
            'group_id' => 'nullable|exists:groups,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $input['corporate_customer_id'];
        $lang = $input['lang'];
        $filter = $input['filter'];
        $date_filter = $input['date_filter'] ?? 'all_time';
        $group_id = $input['group_id'] ?? null;

        $agent_ids = DB::table('corporate_agents')
            ->where('corporate_customer_id', $corporate_customer_id)
            ->pluck('id')
            ->toArray();

        $query = DB::table('trips')
            ->leftJoin('customers', 'customers.id', '=', 'trips.customer_id')
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('trip_types', 'trip_types.id', '=', 'trips.trip_type')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'driver_vehicles.vehicle_type')
            ->leftJoin('booking_statuses', 'booking_statuses.id', '=', 'trips.status')
            ->leftJoin('trip_cancellations', 'trip_cancellations.trip_id', '=', 'trips.id')
            ->leftJoin('cancellation_reasons', 'cancellation_reasons.id', '=', 'trip_cancellations.reason_id')
            ->where(function ($q) use ($corporate_customer_id, $agent_ids) {
                $q->where('trips.corporate_customer_id', $corporate_customer_id)
                    ->orWhereIn('trips.corporate_customer_id', $agent_ids);
            });

        if ($group_id) {
            $query->where('customers.group_id', $group_id);
        }

        $now = Carbon::now('Asia/Kolkata');
        if ($date_filter == 'today') {
            $query->whereDate('trips.pickup_date', $now->toDateString());
        } elseif ($date_filter == 'week') {
            $query->whereBetween('trips.pickup_date', [$now->startOfWeek(), $now->endOfWeek()]);
        } elseif ($date_filter == 'month') {
            $query->whereMonth('trips.pickup_date', $now->month)
                ->whereYear('trips.pickup_date', $now->year);
        }

        if ($lang == 'en') {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type',
                'cancellation_reasons.reason',
                'corporate_agents.first_name as ride_booker_name'
            );
        } else {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment_ar as payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name_ar as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type_ar as vehicle_type',
                'corporate_agents.first_name as ride_booker_name'

            );
        }

        if ($filter == 1) {
            $query->whereIn('trips.status', [1, 2, 3, 4, 5, 6, 7]);
        } elseif ($filter == 2) {
            $query->whereIn('trips.status', [1, 2, 3, 4]);
        } elseif ($filter == 3) {
            $query->whereIn('trips.status', [5]);
        }

        $data = $query->orderBy('trips.id', 'DESC')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }


    public function corporate_agent_bookings(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang' => 'required',
            'filter' => 'required',
            'date_filter' => 'nullable',
            'group_id' => 'nullable|exists:groups,id',
            'user_type' => 'nullable|in:corporate_customer,agent' // optional
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporate_customer_id = $input['corporate_customer_id'];
        $lang = $input['lang'];
        $filter = $input['filter'];
        $date_filter = $input['date_filter'] ?? 'all_time';
        $group_id = $input['group_id'] ?? null;
        $user_type = $input['user_type'] ?? 'corporate_customer';

        // Get agent IDs under this corporate customer
        $agent_ids = DB::table('corporate_agents')
            ->where('corporate_customer_id', $corporate_customer_id)
            ->pluck('id')
            ->toArray();

        $query = DB::table('trips')
            ->leftJoin('customers', 'customers.id', '=', 'trips.customer_id')
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('corporate_agents', 'corporate_agents.id', '=', 'trips.corporate_customer_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('trip_types', 'trip_types.id', '=', 'trips.trip_type')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('vehicle_categories', 'vehicle_categories.id', '=', 'driver_vehicles.vehicle_type')
            ->leftJoin('booking_statuses', 'booking_statuses.id', '=', 'trips.status')
            ->leftJoin('trip_cancellations', 'trip_cancellations.trip_id', '=', 'trips.id')
            ->leftJoin('cancellation_reasons', 'cancellation_reasons.id', '=', 'trip_cancellations.reason_id');

        // Filter by corporate customer or its agents
        if ($user_type == 'corporate_customer') {
            $query->where(function ($q) use ($corporate_customer_id, $agent_ids) {
                $q->where('trips.corporate_customer_id', $corporate_customer_id)
                    ->orWhereIn('trips.corporate_customer_id', $agent_ids);
            });
        } elseif ($user_type == 'agent') {
            // Only agent trips
            $query->whereIn('trips.corporate_customer_id', $agent_ids);
        }

        if ($group_id) {
            $query->where('customers.group_id', $group_id);
        }

        $now = Carbon::now('Asia/Kolkata');
        if ($date_filter == 'today') {
            $query->whereDate('trips.pickup_date', $now->toDateString());
        } elseif ($date_filter == 'week') {
            $query->whereBetween('trips.pickup_date', [$now->startOfWeek(), $now->endOfWeek()]);
        } elseif ($date_filter == 'month') {
            $query->whereMonth('trips.pickup_date', $now->month)
                ->whereYear('trips.pickup_date', $now->year);
        }

        // Select columns based on language
        if ($lang == 'en') {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type',
                'cancellation_reasons.reason',
                'trips.agent_name',
                'trips.agent_phone_number'
            );
        } else {
            $query->select(
                'trips.*',
                'customers.first_name as customer_name',
                'drivers.first_name as driver_name',
                'drivers.profile_picture',
                'payment_methods.payment_ar as payment',
                'driver_vehicles.brand',
                'driver_vehicles.color',
                'driver_vehicles.vehicle_name',
                'driver_vehicles.vehicle_number',
                'trip_types.name_ar as trip_type',
                'booking_statuses.status_name',
                'vehicle_categories.vehicle_type_ar as vehicle_type',
                'trips.agent_name',
                'trips.agent_phone_number'
            );
        }

        if ($filter == 1) {
            $query->whereIn('trips.status', [1, 2, 3, 4, 5, 6, 7]);
        } elseif ($filter == 2) {
            $query->whereIn('trips.status', [1, 2, 3, 4]);
        } elseif ($filter == 3) {
            $query->whereIn('trips.status', [5]);
        }

        $data = $query->orderBy('trips.id', 'DESC')->get();

        // Optional: fetch groups
        $groups = DB::table('customers')
            ->where('corporate_customer_id', $corporate_customer_id)
            ->join('groups', 'groups.id', '=', 'customers.group_id')
            ->distinct()
            ->select('groups.id', 'groups.group_name')
            ->get();

        return response()->json([
            "result" => $data,
            "groups" => $groups,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function customer_excel_upload(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'file' => 'required'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        if ($request->hasFile('file')) {

            $file = $request->file('file');
            $name = time() . '.' . $file->getClientOriginalExtension();
            $destinationPath = public_path('/uploads/customers_excel');
            $file->move($destinationPath, $name);

            return response()->json([
                'result'  => 'customers_excel/' . $name,
                'message' => 'Excel uploaded successfully',
                'status'  => 1
            ]);
        }
    }

    public function customer_excel_import(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'file_path'             => 'required',
            'corporate_customer_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $path = public_path('uploads/' . $request->file_path);

        if (!file_exists($path)) {
            return response()->json([
                'message' => 'File not found',
                'status'  => 0
            ]);
        }

        $rows = Excel::toArray([], $path);
        $data = $rows[0];

        foreach ($data as $key => $value) {

            if ($key == 0 || empty($value[3])) {
                continue;
            }
            $groupName = isset($value[8]) ? trim($value[8]) : null;

            $groupId = $this->getGroupIdByName(
                $groupName,
                $request->corporate_customer_id
            );

            Customer::updateOrCreate(
                [
                    'phone_with_code' => $value[4],
                ],
                [
                    'first_name'            => $value[0],
                    'last_name'             => $value[1] ?? null,
                    'country_code'          => $value[2],
                    'phone_number'          => $value[3],
                    'phone_with_code'       => $value[4],
                    'email'                 => $value[5] ?? null,
                    'password'              => !empty($value[6]) ? Hash::make($value[6]) : null,
                    'status'                => $value[7] ?? 1,
                    'group_id'              => $groupId,

                    'corporate_customer_id' => $request->corporate_customer_id,

                    'roles'                 => 0,
                    'is_deleted'            => 0,
                    'wallet'                => 0,
                ]
            );
        }

        return response()->json([
            'message' => 'Corporate customers imported successfully',
            'status'  => 1
        ]);
    }

    public function getGroupIdByName($groupName, $corporateCustomerId)
    {
        if (empty($groupName)) {
            return 0;
        }

        $group = Group::where('group_name', $groupName)
            ->where('corporate_customer_id', $corporateCustomerId)
            ->first();

        if ($group) {
            return $group->id;
        }

        return Group::create([
            'group_name'            => $groupName,
            'corporate_customer_id' => $corporateCustomerId,
            'status'                => 1
        ])->id;
    }

    public function corporate_promo_codes(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'lang'                  => 'required',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $corporateId = $request->corporate_customer_id;
        $lang = $request->lang;

        if ($lang === 'en') {
            $codes = PromoCode::select(
                'id',
                'promo_name',
                'promo_code',
                'description',
                'promo_type',
                'discount',
                'redemptions',
                'min_fare',
                'max_discount_value',
                'status'
            )
                ->where(function ($q) use ($corporateId) {
                    $q->where('corporate_customer_id', $corporateId)
                        ->orWhere('corporate_customer_id', 0);
                })
                ->get();
        } else {
            $codes = PromoCode::select(
                'id',
                'promo_name_ar as promo_name',
                'promo_code_ar as promo_code',
                'description_ar as description',
                'promo_type',
                'discount',
                'redemptions',
                'min_fare',
                'max_discount_value',
                'status'
            )
                ->where(function ($q) use ($corporateId) {
                    $q->where('corporate_customer_id', $corporateId)
                        ->orWhere('corporate_customer_id', 0);
                })
                ->get();
        }

        $data = [];

        foreach ($codes as $code) {
            $usedCount = CustomerPromoHistory::where('promo_id', $code->id)
                ->where('corporate_customer_id', $corporateId)
                ->where('status', 1)
                ->count();

            if ($code->redemptions > $usedCount) {
                $data[] = $code;
            }
        }

        return response()->json([
            'status'  => 1,
            'message' => 'Success',
            'result'  => $data,
        ]);
    }



    public function download($corporate_customer_id, $from_date, $to_date)
    {
        $fromDate = Carbon::parse($from_date)->format('Y-m-d');
        $toDate   = Carbon::parse($to_date)->format('Y-m-d');
        $contactSetting = ContactSetting::first();
        $appSetting = AppSetting::first();

        $corporateCustomer = CorporateCustomer::findOrFail($corporate_customer_id);

        $agentIds = CorporateAgent::where('corporate_customer_id', $corporate_customer_id)
            ->pluck('id');

        $tripQuery = Trip::whereIn('corporate_customer_id', $agentIds)
            ->where('status', 5)
            ->whereDate('pickup_date', '>=', $fromDate)
            ->whereDate('pickup_date', '<=', $toDate);

        $subTotal = $tripQuery->sum('sub_total');
        $taxTotal = $tripQuery->sum('tax');

        $taxPercentage = $subTotal > 0
            ? round(($taxTotal / $subTotal) * 100, 2)
            : 0;

        $admin_commission_percent = TripSetting::value('service_fee');

        $grandTotal = $subTotal + $taxTotal;
        $sum_total  = $grandTotal + $admin_commission_percent;
        $admin_plus_tax = $admin_commission_percent + $taxTotal;
        $total_excl_vat = $admin_commission_percent + $subTotal;
        $total_incl_vat = $total_excl_vat + $taxTotal;


        $data = [
            'invoice_period' => Carbon::parse($fromDate)->format('d M Y') . ' – ' . Carbon::parse($toDate)->format('d M Y'),
            'corporate_customer_id' => $corporate_customer_id,
            'corporate' => $corporateCustomer,
            'contact' => $contactSetting,
            'appSetting' => $appSetting,
            'admin_plus_tax' => $admin_plus_tax,
            'sub_total' => $subTotal,
            'tax' => $taxTotal,
            'taxPercentage' => $taxPercentage,
            'grand_total' => $grandTotal,
            'admin_commission_percent' => $admin_commission_percent,
            'sum_total' => $sum_total,
            'total_excl_vat' => $total_excl_vat,
            'total_incl_vat' => $total_incl_vat,

        ];

        $pdf = Pdf::loadView('pdf.invoice', $data)
            ->setPaper('A4', 'portrait');

        return $pdf->download(
            'corporate-invoice-' . $corporate_customer_id . '.pdf'
        );
    }

    public function payment_statement_download($payment_statement_id)
    {
        $statement = PaymentStatement::findOrFail($payment_statement_id);

        $corporate = CorporateCustomer::findOrFail($statement->corporate_customer_id);

        $contactSetting = ContactSetting::first();
        $appSetting = AppSetting::first();

        $subTotal = $statement->sub_total;
        $tax      = $statement->tax;
        $total    = $statement->total;

        $taxPercentage = $subTotal > 0
            ? round(($tax / $subTotal) * 100, 2)
            : 0;

        $admin_commission_percent = TripSetting::value('service_fee');

        $admin_plus_tax = $admin_commission_percent + $tax;
        $total_excl_vat = $admin_commission_percent + $subTotal;
        $total_incl_vat = $total_excl_vat + $tax;

        // Invoice period from payment_period
        $start = Carbon::parse($statement->payment_period)->startOfMonth();
        $end   = Carbon::parse($statement->payment_period)->endOfMonth();

        $data = [
            'invoice_period' => $start->format('d M Y') . ' – ' . $end->format('d M Y'),
            'corporate' => $corporate,
            'contact' => $contactSetting,
            'appSetting' => $appSetting,

            'sub_total' => $subTotal,
            'tax' => $tax,
            'taxPercentage' => $taxPercentage,

            'admin_commission_percent' => $admin_commission_percent,
            'admin_plus_tax' => $admin_plus_tax,

            'total_excl_vat' => $total_excl_vat,
            'total_incl_vat' => $total_incl_vat,
        ];

        $pdf = Pdf::loadView('pdf.invoice', $data)
            ->setPaper('A4', 'portrait');

        return $pdf->download(
            'corporate-invoice-' . $payment_statement_id . '.pdf'
        );
    }

    public function download_statement($id)
    {
        $statement = DB::table('payment_statements')
            ->join('corporate_customers', 'corporate_customers.id', '=', 'payment_statements.corporate_customer_id')
            ->where('payment_statements.id', $id)
            ->select(
                'payment_statements.*',
                'corporate_customers.company_name'
            )
            ->first();

        if (!$statement) {
            abort(404, 'Statement not found');
        }

        $startDate = Carbon::parse($statement->payment_period)->startOfMonth();
        $endDate   = Carbon::parse($statement->payment_period)->endOfMonth();

        $trips = DB::table('trips')
            ->leftJoin(
                'corporate_agents',
                'corporate_agents.id',
                '=',
                'trips.corporate_customer_id'
            )
            ->leftJoin('drivers', 'drivers.id', '=', 'trips.driver_id')
            ->leftJoin('driver_vehicles', 'driver_vehicles.id', '=', 'trips.vehicle_id')
            ->leftJoin('payment_methods', 'payment_methods.id', '=', 'trips.payment_method')
            ->leftJoin('promo_codes', 'promo_codes.id', '=', 'trips.promo_code')
            ->leftJoin('corporate_customers', 'corporate_customers.id', '=', 'trips.corporate_customer_id')
            ->where('corporate_agents.corporate_customer_id', $statement->corporate_customer_id)
            ->whereBetween('trips.pickup_date', [$startDate, $endDate])
            ->where('trips.status', 5)
            ->select(
                'trips.*',
                DB::raw("CONCAT(corporate_agents.first_name, ' ', corporate_agents.last_name) as ride_booker"),
                'corporate_agents.phone_number as agent_phone_number',
                'drivers.first_name as driver',
                'driver_vehicles.vehicle_number as vehicle_id',
                'payment_methods.payment as payment_method',
                'promo_codes.promo_code as promo_code'
            )
            ->orderBy('trips.pickup_date')
            ->get();



        $pdf = Pdf::loadView('pdf.corporate_trips', [
            'statement' => $statement,
            'trips'     => $trips,
            'startDate' => $startDate,
            'endDate'   => $endDate
        ])->setPaper('a4', 'landscape');

        return $pdf->download(
            'Trips_' . $startDate->format('M_Y') . '.pdf'
        );
    }

    public function sendError($message)
    {
        $message = $message->all();
        $response['error'] = "validation_error";
        $response['message'] = implode('', $message);
        $response['status'] = "0";
        return response()->json($response, 200);
    }
}
