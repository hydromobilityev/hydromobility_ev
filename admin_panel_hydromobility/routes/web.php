<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\CorporateCustomerController;
use App\Http\Controllers\PaymentMethodController;
use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Artisan;

Route::get('/clear-cache', function () {
    Artisan::call('optimize:clear');
    return 'All cache cleared!';
});

Route::get('/privacy_policy', function () {
    return view('privacy_policy');
});
Route::get('/delete_account_request', function () {
    return view('delete_account_request');
});

Route::get('/', [WebController::class, 'home'])->name('home');
Route::get('/faq', [WebController::class, 'faq'])->name('faq');
Route::get('/privacy', [WebController::class, 'privacy'])->name('privacy');
Route::get('/terms', [WebController::class, 'terms'])->name('terms');
Route::get('/api/google-autocomplete', [App\Http\Controllers\GoogleMapController::class, 'autocomplete']);
Route::get('/api/google-place-details', [App\Http\Controllers\GoogleMapController::class, 'placeDetails']);

/* Dispatch */
Route::post('/find_trip', 'App\Http\Controllers\DispatchController@find_trip');
Route::post('/contact', 'App\Http\Controllers\WebController@doRegister');
Route::get('/customer_chat/{id}', "App\Http\Controllers\CustomerController@customer_chat");
Route::post('/save_polygon', "App\Http\Controllers\WebController@save_polygon");
Route::get('/dispatch_panel', "App\Http\Controllers\WebController@dispatch_panel");
Route::get('/create_zone/{id}/{capital_lat}/{capital_lng}', "App\Http\Controllers\WebController@create_zone");
Route::get('/paywithpaypal/{amount}', array('as' => 'paywithpaypal', 'uses' => 'App\Http\Controllers\PaypalController@payWithPaypal',));
Route::post('/paypal', array('as' => 'paypal', 'uses' => 'App\Http\Controllers\PaypalController@postPaymentWithpaypal',));
Route::get('/paypal', array('as' => 'status', 'uses' => 'App\Http\Controllers\PaypalController@getPaymentStatus',));
Route::get('/paypal_success',  "App\Http\Controllers\PaypalController@success");
Route::get('/paypal_failed',  "App\Http\Controllers\PaypalController@failed");
Route::get('/quickmpesa/{customer_id}/{amount}/{payment_statement_id}',  "App\Http\Controllers\MpesaController@quickMpesa");
Route::get('corporate/statement/{id}',  "App\Http\Controllers\CorporateCustomerController@download_statement");
