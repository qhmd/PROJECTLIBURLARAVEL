<?php

namespace App\Http\Controllers\Home;

use Inertia\Inertia;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Models\Post;

class DashboardController extends Controller
{
    public function index()
{
    $user = Auth::check() ? Auth::user() : null;
    $posts = Post::all();

    $formattedPosts = $posts->map(function($post) {
        $postArray = $post->toArray();
        $postArray['harga'] = 'Rp ' . number_format($post->harga, 0, ',', '.');
        return $postArray;
    });
    
    return Inertia::render('Dashboard', [
        'user' => $user ? [
            'id' => $user->id,
            'first_name' => $user->first_name,
            'last_name' => $user->last_name,
            'email' => $user->email,
            'username' => $user->username,
        ] : null, // Kirim null jika tidak login
        'posts' => $formattedPosts,
    ]);
}
}
