<?php
 
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Validator;
use Redirect;
use App\Models\Zone;
use Mail;
use App\VehicleCategory;
use App\AppSetting;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Artisan;
use App\Models\WebsiteSetting;
use Illuminate\Support\Facades\DB;
class WebController extends Controller
{
    public function doRegister(Request $request)
    {   
         $input = $request->all();
        $validator = Validator::make($input, [
          'name' => 'required', // make sure the email is an actual email
          'email' => 'required',
          'text' => 'required'
        ]);
        if ($validator->fails()) {
            return Redirect::to('contact')->withErrors($validator);
        }
        else
        {
        $data = array();
        // $email= AppSettig::where('id',1)->value('email');
        
        // $data['name'] = $input['name'];
        // $data['email'] = $input['email'];
        // $data['text'] = $input['text'];
        // $mail_header = array("data" => $data);
        // $this->contact_register($mail_header,'Mail received',$input['email']);
          return view('contact',['message' => 'Mail Sent Successfully']);
        }
    }
    
    public function save_polygon(Request $request){
        $input = $request->all();
        Zone::where('id',$input['id'])->update([ 'polygon' => $input['polygon']]);
    }
    
    public function create_zone($id,$capital_lat,$capital_lng){
        $map_settings = DB::table('map_settings')->first();
        if($map_settings->tiles == 1){
            return view('zones.rmp_zone_map',[ 'id' => $id, 'capital_lat' => $capital_lat, 'capital_lng' => $capital_lng ]);
        }else{
            return view('zones.zone_map',[ 'id' => $id, 'capital_lat' => $capital_lat, 'capital_lng' => $capital_lng ]);
        }
    }
    
    public function dispatch_panel(){
        //$default_country = AppSetting::where('id',1)->value('default_country');
        $categories = VehicleCategory::where('status',1)->get();
        $path = [];
        $i = 0;
        foreach($categories as $key => $value){
                $path[$i] = '/drivers/'.$value->id;
                $i++;
        }
        $data['path'] = json_encode($path);
        $data['path'] = preg_replace("_\\\_", "\\\\\\", $data['path']);
        $data['path'] = preg_replace("/\"/", "\\\"", $data['path']);
        
        $map = DB::table('map_settings')->first();
        
        if($map->tiles == 1){
            return view('admin.rmp_dispatch_map',$data);
        }else{
            return view('admin.dispatch_map',$data);
        }
        
    }
    
    public function home(){
        $website_settings = DB::table('website_settings')->first();
        $testimonials = DB::table('testimonials')->get();
        $vehicle_categories = DB::table('vehicle_categories')->get();
        $our_services = DB::table('our_services')->get();
        $app_settings = DB::table('app_settings')->first();
        $contact_settings = DB::table('contact_settings')->first();
        return view('index', ['website_settings' => $website_settings, 'testimonials' => $testimonials, 'our_services' => $our_services, 'vehicle_categories' => $vehicle_categories, 'app_settings' => $app_settings, 'contact_settings' => $contact_settings]);
    }
    
    public function faq(){
        $data = DB::table('faqs')->where('status',1)->get();
        $website_settings = DB::table('website_settings')->first();
        $app_settings = DB::table('app_settings')->first();
        $contact_settings = DB::table('contact_settings')->first();
        return view('faq', ['data' => $data, 'website_settings' => $website_settings, 'app_settings' => $app_settings, 'contact_settings' => $contact_settings]);
    }
    
    public function privacy(){
        $data = DB::table('privacy_policies')->where('status',1)->get();
        $website_settings = DB::table('website_settings')->first();
        $app_settings = DB::table('app_settings')->first();
        $contact_settings = DB::table('contact_settings')->first();
        return view('privacy', ['data' => $data, 'website_settings' => $website_settings, 'app_settings' => $app_settings, 'contact_settings' => $contact_settings]);
    }
    
    public function terms(){
        $data = DB::table('term_conditions')->where('status',1)->get();
        $website_settings = DB::table('website_settings')->first();
        $app_settings = DB::table('app_settings')->first();
        $contact_settings = DB::table('contact_settings')->first();
        return view('terms', ['data' => $data, 'website_settings' => $website_settings, 'app_settings' => $app_settings, 'contact_settings' => $contact_settings]);
    }
}
