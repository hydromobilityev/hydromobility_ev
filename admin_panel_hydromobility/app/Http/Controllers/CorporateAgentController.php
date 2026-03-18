<?php

namespace App\Http\Controllers;

use App\CorporateCustomer as AppCorporateCustomer;
use App\Http\Controllers\Controller;
use App\Models\CorporateAgent;
use App\CorporateCustomer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class CorporateAgentController extends Controller
{
    public function register(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
            'first_name'            => 'required|string|max:100',
            'last_name'             => 'required|string|max:100',
            'phone_number'          => 'required|string|max:20|unique:corporate_agents,phone_number',
            'phone_with_code'       => 'required|string|max:20|unique:corporate_agents,phone_with_code',
            'email'                 => 'required|email|unique:corporate_agents,email',
            'username'              => 'required|string|max:100',
            'password'              => 'required|string|min:6',
            'address'               => 'required|string',
            'status'                => 'nullable|integer|exists:statuses,id',
            'profile_picture'       => 'nullable',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $usernameExists =
            CorporateAgent::where('username', $request->username)->exists() ||
            CorporateCustomer::where('username', $request->username)->exists();

        if ($usernameExists) {
            return response()->json([
                'status' => 0,
                'message' => 'The username is already taken. Please choose another one.',
            ], 409);
        }

        $imagePath = null;
        if ($request->hasFile('profile_picture')) {
            $image = $request->file('profile_picture');
            $imageName = 'corporate_agents/' . Str::random(10) . '.' . $image->getClientOriginalExtension();
            $image->storeAs('public', $imageName);
            $imagePath = $imageName;
        }

        $salt = "";
        $saltchars = array_merge(range('A', 'Z'), range('a', 'z'), range(0, 9));
        for ($i = 0; $i < 22; $i++) {
            $salt .= $saltchars[array_rand($saltchars)];
        }
        $encryptedPassword = crypt($request->password, sprintf('$2y$%2d$', 12) . $salt);

        $agent = CorporateAgent::create([
            'corporate_customer_id' => $request->corporate_customer_id,
            'first_name'            => $request->first_name,
            'last_name'             => $request->last_name,
            'phone_number'          => $request->phone_number,
            'phone_with_code'       => $request->phone_with_code,
            'email'                 => $request->email,
            'username'              => $request->username,
            'password'              => $encryptedPassword,
            'profile_picture'       => $imagePath,
            'address'               => $request->address,
            'status'                => $request->status ?? 1,
        ]);

        return response()->json([
            'status' => 1,
            'message' => 'Corporate agent registered successfully.',
            'data' => $agent,
        ]);
    }

    public function corporate_agent_list(Request $request)
    {
        $input = $request->all();

        $validator = Validator::make($input, [
            'corporate_customer_id' => 'required|exists:corporate_customers,id',
        ]);

        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }

        $corporateCustomerId = $input['corporate_customer_id'];

        $agents = CorporateAgent::where('corporate_customer_id', $corporateCustomerId)
            ->orderBy('id', 'desc')
            ->select(
                'id',
                'corporate_customer_id',
                'first_name',
                'last_name',
                'email',
                'phone_number',
                'phone_with_code',
                'username',
                'profile_picture',
                'address',
                'status',
                'created_at'
            )
            ->get();

        if ($agents->isEmpty()) {
            return response()->json([
                'status' => 0,
                'message' => 'No corporate agents found for this corporate customer.',
                'result' => [],
            ]);
        }

        return response()->json([
            'status' => 1,
            'message' => 'Corporate agent list fetched successfully.',
            'result' => $agents,
        ]);
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
            $destinationPath = public_path('/uploads/corporate_agents');
            $image->move($destinationPath, $name);
            return response()->json([
                "result" => 'corporate_agents/' . $name,
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

        if (CorporateAgent::where('id', $input['id'])->update($input)) {
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

        if (CorporateAgent::where('id', $id)->update($input)) {
            $result = CorporateAgent::select(
                'id',
                'first_name',
                'last_name',
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
            'corporate_agent_id' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        $result = CorporateAgent::where('id', $input['corporate_agent_id'])->first();
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

    public function sendError($message)
    {
        $message = $message->all();
        $response['error'] = "validation_error";
        $response['message'] = implode('', $message);
        $response['status'] = "0";
        return response()->json($response, 200);
    }
}
