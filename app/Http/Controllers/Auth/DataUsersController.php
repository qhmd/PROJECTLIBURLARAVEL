<?php

namespace App\Http\Controllers\Auth;

use Inertia\inertia;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;


class DataUsersController extends Controller
{
    public function index()
    {
        // Mengambil data pengguna yang sedang login
        $user = Auth::user();
        
        // Menampilkan data pengguna
        return inertia('Profile', [
            'user' => $user, // Kirim data pengguna ke halaman Inertia.js
        ]);
    }
}
