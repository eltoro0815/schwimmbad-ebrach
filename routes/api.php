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

// create a user
Route::post('user', 'UserController@createOrRetrieve');

// create or update a subscription for a user
Route::post('subscription', 'SubscriptionController@store');

// delete a subscription for a user
Route::post('subscription/delete', 'SubscriptionController@destroy');




Route::get('/isopen', function (Request $request) {
    $isopen = Geeoffnet::firstOrCreate(
        ['id' => 1]
    );

    $isopen = $isopen->fresh();

    return array(
      'isopen' => $isopen->offen
    );
});

Route::put('/toggle', function (Request $request) {
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
});
