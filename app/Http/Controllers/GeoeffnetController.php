<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Geoeffnet;
use App\User;

use Notification;
use App\Notifications\GeoeffnetNotification;

class GeoeffnetController extends Controller
{
    public function isopen(Request $request)
    {
        $isopen = Geoeffnet::firstOrCreate(
            ['id' => 1]
        );
    
        $isopen = $isopen->fresh();
    
        return array(
          'isopen' => $isopen->offen
        );
    }

    public function toggle(Request $request) 
    {
        $isopen = Geoeffnet::firstOrCreate(
            ['id' => 1]
        );
    
        $isopen = $isopen->fresh();
    
        $isopen->offen = !$isopen->offen;
        $isopen->save();

        Notification::send(User::all(), new GeoeffnetNotification);

    }
}
