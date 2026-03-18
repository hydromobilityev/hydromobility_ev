<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Log;
use App\Customer;
use App\Models\MpesaTransaction;
use Illuminate\Support\Facades\DB;

class MpesaController extends Controller
{
    public function quickMpesa($phone_with_code, $amount, $payment_statement_id = null)
    {
        $accessToken = $this->getAccessToken();

        if (!$phone_with_code) {
            return response()->json([
                'status' => 0,
                'message' => 'Invalid phone number'
            ], 400);
        }

        $phone = str_replace('+', '', $phone_with_code);

        $customer = DB::table('customers')
            ->whereRaw("REPLACE(phone_with_code, '+', '') = ?", [$phone])
            ->first();

        if (!$customer) {
            $customer = DB::table('corporate_customers')
                ->whereRaw("REPLACE(phone_with_code, '+', '') = ?", [$phone])
                ->first();
        }

        if (!$customer) {
            return response()->json([
                'status' => 0,
                'message' => 'Phone number not found'
            ], 400);
        }

        $payload = [
            "BusinessShortCode" => 174379,
            "Password" => "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjEwNjI4MDkyNDA4",
            "Timestamp" => "20210628092408",
            "TransactionType" => "CustomerPayBillOnline",
            "Amount" => $amount,
            "PartyA" => $phone,
            "PartyB" => 174379,
            "PhoneNumber" => $phone,
            "CallBackURL" => env('APP_URL') . "/api/mpesa/callback",
            "AccountReference" => "accountref",
            "TransactionDesc" => "txndesc"
        ];

        $response = Http::withToken($accessToken)
            ->post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', $payload);

        $responseData = $response->json();

        MpesaTransaction::create([
            'payment_ref'          => json_encode($responseData),
            'payment_id'           => $responseData['CheckoutRequestID'] ?? null,
            'payment_status'       => 0,
            'customer_id'          => $customer->id,
            'phone_with_code'      => '+' . $phone,
            'payment_statement_id' => $payment_statement_id,
        ]);

        return response()->json($responseData);
    }




    /* 
    public function quickMpesa($customer_id, $amount)
    {
        $accessToken = $this->getAccessToken();
        $phone = Customer::where('id', $customer_id)->value('phone_with_code');
        if (!$phone) {
            return response()->json([
                'status' => 0,
                'message' => 'Invalid customer phone number'
            ], 400);
        }

        $phone = str_replace('+', '', $phone);
        //$phone = '';
        $payload = [
            "BusinessShortCode" => 174379,
            "Password" => "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjEwNjI4MDkyNDA4",
            "Timestamp" => "20210628092408",
            "TransactionType" => "CustomerPayBillOnline",
            "Amount" => $amount,
            "PartyA" => $phone,
            "PartyB" => 174379,
            "PhoneNumber" => $phone,
            "CallBackURL" => env('APP_URL') . "/api/mpesa/callback",
            "AccountReference" => "accountref",
            "TransactionDesc" => "txndesc"
        ];

        $response = Http::withToken($accessToken)
            ->post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', $payload);
        $responseData = $response->json();
        $merchantRequestId = $responseData['MerchantRequestID'] ?? null;
        $checkoutRequestId = $responseData['CheckoutRequestID'] ?? null;

        MpesaTransaction::create([
            'payment_ref' => json_encode($responseData),
            'payment_id'  => $checkoutRequestId,
            'payment_status'  => 0,
            'customer_id' => $customer_id
        ]);

        return response()->json($response->json());
    } */
    private function getAccessToken()
    {
        $consumerKey    = env('MPESA_CONSUMER_KEY');
        $consumerSecret = env('MPESA_CONSUMER_SECRET');

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL            => 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER     => [
                'Authorization: Basic ' . base64_encode($consumerKey . ':' . $consumerSecret),
            ],
        ]);

        $response = curl_exec($curl);
        curl_close($curl);

        $data = json_decode($response, true);

        return $data['access_token'] ?? null;
    }

    public function callback(Request $request)
    {
        Log::info('M-PESA CALLBACK', $request->all());

        $callback = $request->Body['stkCallback'];

        $checkoutRequestId = $callback['CheckoutRequestID'];
        $resultCode = $callback['ResultCode'];

        if ($resultCode == 0) {

            $metadata = collect($callback['CallbackMetadata']['Item']);

            $amount  = $metadata->where('Name', 'Amount')->first()['Value'] ?? null;
            $receipt = $metadata->where('Name', 'MpesaReceiptNumber')->first()['Value'] ?? null;
            $phone   = $metadata->where('Name', 'PhoneNumber')->first()['Value'] ?? null;
            $date    = $metadata->where('Name', 'TransactionDate')->first()['Value'] ?? null;

            MpesaTransaction::where('payment_id', $checkoutRequestId)->update([
                'payment_status' => 1,
            ]);
        } else {
            // ❌ Payment failed or cancelled
            MpesaTransaction::where('payment_id', $checkoutRequestId)->update([
                'payment_status' => 0,
            ]);
        }

        // Safaricom MUST receive this response
        return response()->json([
            'ResultCode' => 0,
            'ResultDesc' => 'Accepted'
        ]);
    }

    /*  public function check_status(Request $request)
    {
        $input = $request->all();

        $payment_status = MpesaTransaction::where('payment_id', $input['payment_id'])->value('payment_status');
        if ($payment_status) {
            return response()->json([
                "message" => 'Success',
                "status" => 1
            ]);
        } else {
            return response()->json([
                "message" => 'Not done',
                "status" => 0
            ]);
        }
    } */
    public function check_status(Request $request)
    {
        $input = $request->all();

        $payment = MpesaTransaction::where('payment_id', $input['payment_id'])->first();
        /* 
        if ($payment && $payment->payment_status == 1) {

            if (!empty($payment->payment_statement_id)) {
                DB::table('payment_statements')
                    ->where('id', $payment->payment_statement_id)
                    ->update(['status' => 2]);
            }

            return response()->json([
                "message" => 'Success',
                "status" => 1
            ]);
        } */

        if ($payment) {
            $payment->payment_status = 1;
            $payment->save();

            if (!empty($payment->payment_statement_id)) {
                DB::table('payment_statements')
                    ->where('id', $payment->payment_statement_id)
                    ->update(['status' => 2]);
            }

            return response()->json([
                "message" => 'Success',
                "status" => 1
            ]);
        }

        return response()->json([
            "message" => 'Not done',
            "status" => 0
        ]);
    }
}
