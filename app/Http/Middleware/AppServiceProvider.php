<?php

use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

public function boot()
{
    Inertia::share([
        'auth' => function () {
            $user = Auth::user();
            return [
                'user' => $user ? [
                    'id' => $user->id,
                    'first_name' => $user->first_name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'username' => $user->username,
                ] : null,
            ];
        },
    ]);
}

