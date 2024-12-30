<?php
    namespace App\Http\Controllers\Auth;
    
    use App\Http\Controllers\Controller;
    use App\Models\User;
    use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Hash;
    use Illuminate\Support\Facades\Auth;
    use Illuminate\Support\Facades\Validator;
    use Illuminate\Validation\Rules\Password;
    use Illuminate\Validation\validatePasswordConfirm;

    use Laravel\Socialite\Facades\Socialite;


    class RegisterController extends Controller {
        public function store(Request $request) {
            $request->validate([
                'firstName' => ['required', 'string', 'max:255'],
                'lastName' => ['nullable', 'string', 'max:255'],
                'username' => ['required', 'string', 'max:255', 'unique:users'],
                'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
                'password' => ['required', 'confirmed', Password::defaults()],
                'password_confirmation' => ['required'],
            ]);

            // if ($validator->fails()) {
            //     // Menggunakan metode handleValidationErrors dari Controller
            //     return $this->handleValidationErrors($validator);
            // }

            $user = User::create([
                'first_name' => $request->firstName,
                'last_name' => $request->lastName,
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            Auth::login($user);
            // event(new Registered($user));

            return redirect('/dashboard')->with('success', 'Selamat, Anda berhasil mendaftar!');
        }

        public function validUserEmail(Request $request) {
            $field = $request->input('field');
            $value = $request->input('value');

            if (!in_array($field, ['email', 'username'])) {
                return response()->json(['message' => 'Invalid field'], 400);
            }

            $exists = \App\Models\User::where($field, $value)->exists();

            return response()->json(['available' => !$exists]);
        }

        protected function generateUniqueUsername($baseName) {
            do {
                // Buat username acak, misalnya: john1234 atau user1234
                $username = strtolower($baseName) . rand(1000, 9999);
            } while (User::where('username', $username)->exists());
        
            return $username;
        }
        

        public function redirectToGoogle() {
            return Socialite::driver('google')->redirect();
        }

        public function handleGoogleCallback(Request $request) {
            try {
                $googleUser = Socialite::driver('google')->stateless()->user();
        
                // Cek apakah pengguna sudah ada berdasarkan google_id
                $user = User::where('google_id', $googleUser->getId())->first();
        
                if (!$user) {
                    // Jika tidak ada berdasarkan google_id, cari berdasarkan email
                    $username = $this->generateUniqueUsername($googleUser->user['given_name'] ?? 'user');
                    $user = User::where('email', $googleUser->getEmail())->first();
        
                    if ($user) {
                        // Jika pengguna manual ada, tambahkan google_id
                        $user->update(['google_id' => $googleUser->getId()]);
                    } else {
                        // Jika tidak ada pengguna sama sekali, buat pengguna baru
                        $user = User::create([
                            'first_name' => $googleUser->user['given_name'] ?? null,
                            'last_name' => $googleUser->user['family_name'] ?? null,
                            'email' => $googleUser->getEmail(),
                            'username' => $username,
                            'google_id' => $googleUser->getId(),
                            'password' => Hash::make(uniqid()), // Password acak untuk akun Google
                        ]);

                        \Log::info('User created:', $user->toArray());
                    }
                }

                \Log::info('Google User:', [
                    'id' => $googleUser->getId(),
                    'email' => $googleUser->getEmail(),
                    'name' => $googleUser->getName(),
                    'first_name' => $googleUser->user['given_name'] ?? null,
                    'last_name' => $googleUser->user['family_name'] ?? null,
                ]);
        
                // Cek apakah pengguna sudah memiliki username
        
                // Login pengguna
                Auth::login($user);
        
                return redirect('/dashboard')->with('success', 'Berhasil login dengan Google!');
            } catch (\Exception $e) {
                \Log::error('Error during Google login:', [
                    'message' => $e->getMessage(),
                    'trace' => $e->getTraceAsString(),
                ]);
            
                return redirect('/')->with('error', 'Terjadi kesalahan saat login dengan Google.');
            }
        }
}