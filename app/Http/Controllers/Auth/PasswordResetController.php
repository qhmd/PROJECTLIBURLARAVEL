<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class PasswordResetController extends Controller {
    public function sendResetLink(Request $request)
    {
        $request->validate(['email' => 'required|email|exists:users,email']);
        $otp = rand(100000, 999999); // Generate OTP
        Cache::put('otp_' . $request->email,['otp' => $otp, 'used' => false], now()->addMinutes(30)); // Simpan OTP di cache selama 5 menit

        session(['email' => $request->email]);
        // Kirim OTP (contoh: menggunakan Mail)
        Mail::send('Auth.forgot-password', ['otp' => $otp], function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Kode OTP untuk Verifikasi Akun Anda');
        });

        return redirect()->intended('/input-otp')->with('status', 'Kode OTP telah dikirim ke email Anda.');
    }

    
    public function verifyOtp(Request $request)
    {
        // Validasi input OTP saja
        $request->validate([
            'otp' => 'required|numeric'
        ]);

        // Ambil email dari sesi pengguna yang sedang login
        $email = session('email');

        // Log email pengguna
        Log::info('Verifikasi OTP untuk email: ' . $email);
    
        // Ambil OTP yang disimpan di cache
        $storedOtp = Cache::get('otp_' . $email);
    
        // Log OTP yang disimpan dan OTP yang diinputkan
        Log::info('OTP yang disimpan: ' . ($storedOtp['otp'] ?? 'Tidak ditemukan'));
        Log::info('OTP yang diinputkan: ' . $request->otp);

        if ($storedOtp && $storedOtp['used']) {
            Log::warning('OTP sudah digunakan untuk email: ' . $email);
            return back()->withErrors(['message' => 'OTP sudah digunakan.']);
        }
    
        // Periksa kesesuaian OTP
        if ($storedOtp && $storedOtp['otp'] == $request->otp) {
            Cache::put('otp_' . $email, ['otp' => $storedOtp['otp'], 'used' => true], now()->addMinutes(5));
            Log::info('OTP valid untuk email: ' . $email);
    
            // Redirect dengan pesan sukses menggunakan Inertia
            return redirect()->intended('login')->with('success', 'OTP valid.');
        }
    
        // Log jika OTP tidak valid
        Log::warning('OTP tidak valid untuk email: ' . $email);
    
        // Redirect dengan pesan error menggunakan Inertia
        return back()->withErrors(['message' => 'OTP tidak valid.']);
    }
    
    
}