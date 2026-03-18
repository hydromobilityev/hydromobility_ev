<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Cartalyst\Stripe\Stripe;
use Illuminate\Support\Facades\DB;
use Kreait\Firebase;
use Kreait\Firebase\Factory;
use Kreait\Firebase\ServiceAccount;
use Kreait\Firebase\Database;
use App\PrivacyPolicy;
use App\Models\TermCondition;
use App\Faq;
use Mail;
use DateTime;
use Validator;

class WebsiteController extends Controller
{

    public function get_website_settings()
    {
        $data = DB::table('website_settings')->first();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_testimonials()
    {
        $data = DB::table('testimonials')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_our_services()
    {
        $data = DB::table('our_services')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_how_it_works()
    {
        $data = DB::table('how_it_works')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_contact_settings()
    {
        $data = DB::table('contact_settings')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function privacy_policies(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'lang' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        if ($input['lang'] == 'en') {
            $data = PrivacyPolicy::select('id', 'title', 'description', 'status')->where('status', 1)->get();
        } else {
            $data = PrivacyPolicy::select('id', 'title_ar as title', 'description_ar as description', 'status')->where('status', 1)->get();
        }
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function Getfaqs(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'lang' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        if ($input['lang'] == 'en') {
            $data = Faq::select('id', 'question', 'answer', 'status')->where('status', 1)->where('user_type_id', 4)->get();
        } else {
            $data = Faq::select('id', 'question_ar as question', 'answer_ar as answer', 'status')->where('status', 1)->where('user_type_id', 4)->get();
        }
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function GetTermsconditions(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'lang' => 'required'
        ]);
        if ($validator->fails()) {
            return $this->sendError($validator->errors());
        }
        if ($input['lang'] == 'en') {
            $data = TermCondition::select('id', 'title', 'terms', 'status')->where('status', 1)->get();
        } else {
            $data = TermCondition::select('id', 'title_ar as title', 'terms_ar as terms', 'status')->where('status', 1)->get();
        }
        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
    }

    public function get_app_details()
    {
        $data = DB::table('app_details')->get();

        return response()->json([
            "result" => $data,
            "message" => 'Success',
            "status" => 1
        ]);
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
