<?php

namespace App\Http\Controllers\Home;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class DashboardController extends Controller
{
    public function index()
    {
        // Cek apakah pengguna sedang login
        $user = Auth::check() ? Auth::user() : null;

        return Inertia::render('Dashboard', [
            'user' => $user ? [
                'id' => $user->id,
                'first_name' => $user->first_name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'username' => $user->username,
            ] : null, // Kirim null jika tidak login
        ]);
    }
}
