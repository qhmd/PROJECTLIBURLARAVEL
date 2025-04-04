<?php
use Illuminate\Support\Facades\Route;
use Inertia\inertia;

use App\Http\Controllers\Auth\RegisterController;

use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\PasswordResetController;
use App\Http\Controllers\Auth\DataUsersController;
use App\Http\Controllers\Home\PostController;
use App\Http\Controllers\Home\DashboardController;

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


Route::get('/forgot-password', function () {
    return Inertia::render('ForgotPassword');
});

Route::get('/input-otp' ,function () {
    return Inertia::render('OtpForget');
});

Route::get('/reset-password', function () {
    return Inertia::render('ChangePassword');
});

Route::post('/forgot-password',[PasswordResetController::class, 'sendResetLink']);

// Route untuk redirect ke Google
Route::get('/auth/google/redirect', [RegisterController::class, 'redirectToGoogle']);

// Route untuk callback dari Google
Route::get('/auth/google/callback', [RegisterController::class, 'handleGoogleCallback']);

Route::post('/posts/create',[PostController::class, 'store']);

Route::get('/dashboard', [DashboardController::class, 'index']);

Route::post('/login', [LoginController::class, 'login']);
Route::post('/logout', [LogoutController::class, 'logout']);
Route::post('/reset-password', [PasswordResetController::class, 'updateUserPass']);
// Route::middleware(['auth'])->get('/dashboard', [DataUsersController::class, 'index']);

Route::post('/register',[RegisterController::class, 'store']);
Route::post('/validuseremail',[RegisterController::class, 'validUserEmail']);
Route::post('/input-otp',[PasswordResetController::class, 'verifyOtp']);