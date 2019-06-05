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

    $isopen = Geeoffnet::first();

    return array(
      'isopen' => $isopen->offen
    );
});

Route::get('/toggle', function (Request $request) {

});


