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

            // event(new Registered($user));

            return redirect('/')->with('success', 'Selamat, Anda berhasil mendaftar!');
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
}