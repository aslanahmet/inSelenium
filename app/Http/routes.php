<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::auth();

Route::get('/', 'PageController@index');

Route::get('tests', 'TestController@get_all_tests');

Route::get('addtest/{id?}', 'TestController@add_tests');

Route::get('alltest', 'TestController@get_all_tests');


