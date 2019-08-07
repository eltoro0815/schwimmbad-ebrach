<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Geoeffnet;
use App\User;

use Notification;
use App\Notifications\GeoeffnetNotification;
use App\Notifications\GeschlossenNotification;

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

        if ($isopen->offen) {
            Notification::send(User::all(), new GeoeffnetNotification);
        } else {
            Notification::send(User::all(), new GeschlossenNotification);
        }
    }
}
