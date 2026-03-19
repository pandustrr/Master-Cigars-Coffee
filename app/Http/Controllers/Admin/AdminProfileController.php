<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class AdminProfileController extends Controller
{
    public function edit(Request $request)
    {
        return Inertia::render('Admin/Profile', [
            'status' => session('status'),
        ]);
    }

    public function update(Request $request)
    {
        $user = $request->user();

        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'name' => ['required', 'string', 'max:255'],
        ]);

        $user->fill($validated);

        if ($request->filled('password')) {
            $request->validate([
                'password' => ['required', 'confirmed', Password::defaults()],
            ]);
            $user->password = Hash::make($request->password);
        }

        $user->save();

        return redirect()->back()->with('status', 'Profile updated successfully!');
    }
}
