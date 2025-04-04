<?php

namespace App\Http\Controllers\Home;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function index() {
        $posts = Post::all();
        return response()->json($posts);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product' => 'required|string|max:255',
            'price' => 'required|integer',
            'explanation' => 'nullable|string',
            'picture' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !is_array($value)) {
                        $fail("The $attribute must be a string or an array.");
                    }
                },
            ],
        ]);

        Post::create([
            'name_items' => $request->product,
            'harga' => $request->price,
            'keterangan' => $request->explanation,
            'picture' => is_array($request->picture) ? json_encode($request->picture) : $request->picture,
        ]);
        return redirect('/dashboard')->with('success', 'Post berhasil dibuat!');
    }

}
