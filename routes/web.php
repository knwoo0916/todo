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

Route::get('/', 'MainController@index');

Route::get('/data', 'MainController@getData')->middleware('login');
Route::get('/check', 'UserController@loginStatus');

Route::post('/login', 'UserController@login');
Route::get('/logout', 'UserController@logout')->middleware('login');


Route::get('/todo', 'TodoController@getTodoList')->middleware('login');
Route::post('/todo', 'TodoController@postTodo')->middleware('login');
Route::post('/com', 'TodoController@postComplete')->middleware('login');
Route::post('/del', 'TodoController@postDelete')->middleware('login');
