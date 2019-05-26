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

use App\Events\GeeoffnetChanged;

Route::get('/', function () {
    $geeoffnet = \App\Geeoffnet::first();
    $dochange = request()->input('change') == "true";
    $isadmin = request()->input('admin') == "true";
    
    if ($dochange && $isadmin)
    {
        $geeoffnet->offen = !$geeoffnet->offen;
        $geeoffnet->save();

        $message = "";
        if ($geeoffnet->offen == 1)
        {
            $message = "Das Schwimmbad Ebrach hat gerade geöffnet";
        }
        else {
            $message = "Das Schwimmbad Ebrach hat gerade geschlossen";
        }

        $options = array(
            'cluster' => 'eu',
            'useTLS' => true
          );
        $pusher = new Pusher\Pusher(
            'a756753461ffa40e21fa',
            '1a7675ceb9c2b55af106',
            '790650',
            $options
        );

        $pusher->trigger('geoffnet-changed', 'geoffnet-event', $message);
    }
    

    $url = url()->current();

    return view('welcome', [
        'geeoffnet' => $geeoffnet,
        'isadmin' => $isadmin,
        'url' => $url
    ]);
});
