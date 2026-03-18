<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class GoogleMapController extends Controller
{
    public function autocomplete(Request $request)
    {
        $query = $request->input('input');
        $apiKey = env('MAP_KEY');

        $response = Http::get("https://maps.googleapis.com/maps/api/place/autocomplete/json", [
            'input' => $query,
            'key'   => $apiKey
        ]);

        return response()->json($response->json());
    }

    public function placeDetails(Request $request)
    {
        $placeId = $request->input('place_id');
        $apiKey = env('MAP_KEY');

        $response = Http::get("https://maps.googleapis.com/maps/api/place/details/json", [
            'place_id' => $placeId,
            'key'      => $apiKey
        ]);

        return response()->json($response->json());
    }
}
