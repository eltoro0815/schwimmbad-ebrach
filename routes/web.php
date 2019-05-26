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

Route::get('/', function () {
    $geeoffnet = \App\Geeoffnet::first();
    $dochange = request()->input('change') == "true";
    $isadmin = request()->input('admin') == "true";
    
    if ($dochange && $isadmin)
    {
        $geeoffnet->offen = !$geeoffnet->offen;
        $geeoffnet->save();
    }
    

    $url = url()->current();

    return view('welcome', [
        'geeoffnet' => $geeoffnet,
        'isadmin' => $isadmin,
        'url' => $url
    ]);
});
