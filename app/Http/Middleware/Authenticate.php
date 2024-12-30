<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckSomething
{
    public function handle(Request $request, Closure $next)
    {
        // Logika middleware, misalnya memeriksa sesuatu
        if (!$request->user()) {
            return redirect('/login'); // Redirect jika pengguna belum login
        }

        return $next($request);
    }
}
