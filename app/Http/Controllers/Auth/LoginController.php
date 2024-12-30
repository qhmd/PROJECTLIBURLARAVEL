<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        // Validasi data login
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:8',
        ]);

        $credentials = $request->only('email', 'password');

        // Cek apakah login berhasil
        if (Auth::attempt($credentials)) {
            // Login sukses, redirect ke halaman yang dimaksud
            return redirect()->intended('/dashboard');
        }

        // Jika login gagal, kirimkan error kembali dengan pesan yang lebih jelas
        return back()->withErrors([
            'email' => 'Invalid credentials, please try again.',
        ]);
    }
}
