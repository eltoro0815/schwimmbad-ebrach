<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use App\Events\GeeoffnetChanged;
use App\Geeoffnet;

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/isopen', function (Request $request) {
    $isopen = Geeoffnet::firstOrCreate(
        ['id' => 1]
    );

    $isopen = $isopen->fresh();

    return array(
      'isopen' => $isopen->offen
    );
});

Route::get('/toggle', function (Request $request) {
    $isopen = Geeoffnet::firstOrCreate(
        ['id' => 1]
    );

    $isopen = $isopen->fresh();

    $isopen->offen = !$isopen->offen;
    $isopen->save();

    $message = "";
    if ($isopen->offen == 1) {
        $message = "Das Schwimmbad Ebrach ist gerade geöffnet";
    } else {
        $message = "Das Schwimmbad Ebrach ist gerade geschlossen";
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
});
