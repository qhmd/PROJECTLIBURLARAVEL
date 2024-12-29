<?php
use Illuminate\Support\Facades\Route;
use Inertia\inertia;

use App\Http\Controllers\Auth\RegisterController;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/login', function () {
    return Inertia::render('Login');
});

Route::get('/about', function () {
    return Inertia::render('About');
});


Route::get('/register', function () {
    return Inertia::render('Register');
});

Route::post('/register',[RegisterController::class, 'store']);
Route::post('/validuseremail',[RegisterController::class, 'validUserEmail']);