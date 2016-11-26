<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/


Route::get('/', function(){
  return view('welcome');
});

Route::get('/welcome', function () {
  return view('welcome');
});

Route::get('/about', function(){
  return view('about');
});

Route::get('/services', function(){
  return view('services');
});

Route::get('/contact', function(){
  return view('contact');
});
