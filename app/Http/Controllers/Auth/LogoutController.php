<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class LogoutController extends Controller
{
    public function logout()
    {
        // Logout pengguna
        Auth::logout();

        // Redirect ke halaman login atau halaman utama
        return redirect('/')->with('success', 'Anda telah logout.');
    }
}
