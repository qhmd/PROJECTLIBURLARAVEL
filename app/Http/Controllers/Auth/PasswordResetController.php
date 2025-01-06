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
        $otp = rand(10000, 99999); // Generate OTP
        Cache::put('otp_' . $request->email, $otp, 300); // Simpan OTP di cache selama 5 menit

        // Kirim OTP (contoh: menggunakan Mail)
        Mail::send('Auth.forgot-password', ['otp' => $otp], function ($message) use ($request) {
            $message->to($request->email)
                    ->subject('Kode OTP untuk Verifikasi Akun Anda');
        });

        return redirect()->intended('/otp')->with('status', 'Kode OTP telah dikirim ke email Anda.');

    }


    public function reset(Request $request)
    {
        // Log request data (tanpa password untuk keamanan)
        Log::info('Reset password request received', [
            'email' => $request->email,
            'token' => $request->token,
        ]);
    
        // Validasi input
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        // Log bahwa validasi berhasil
        Log::info('Validation passed for reset password request', [
            'email' => $request->email,
        ]);
    
        // Proses reset password
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => bcrypt($password),
                ])->save();
    
                // Log user update
                Log::info('User password updated successfully', ['user_id' => $user->id]);
            }
        );
    
        // Log hasil reset password
        if ($status === Password::PASSWORD_RESET) {
            Log::info('Password reset successful', ['email' => $request->email]);
        } else {
            Log::error('Password reset failed', [
                'email' => $request->email,
                'status' => $status,
            ]);
        }
        Log::info('Reset password request received', [
            'token' => $request->header('X-CSRF-TOKEN'),
        ]);
    
        // Respons ke pengguna
        return $status === Password::PASSWORD_RESET
            ? redirect('/login')->with('status', __($status))
            : back()->withErrors(['email' => [__($status)]]);

        if ($status === Password::INVALID_TOKEN) {
            Log::error('Password reset failed due to invalid or expired token', [
                'email' => $request->email,
                'status' => $status,
            ]);
            return redirect('/login')->withErrors(['email' => __('This password reset link is invalid or expired.')]);
        }
            
    }
    
}