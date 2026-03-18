<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\MainProduct;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminMainProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/MainProduct/Index', [
            'mainProducts' => MainProduct::latest()->get(),
            'categories' => \App\Models\Category::all()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('main-products', 'public');
        }

        MainProduct::create($validated);

        return redirect()->back()->with('success', 'Main Product created successfully.');
    }

    public function update(Request $request, $id)
    {
        $mainProduct = MainProduct::findOrFail($id);
        
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'category' => 'required|string',
            'description' => 'required|string',
            'image' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            if ($mainProduct->image) {
                Storage::disk('public')->delete($mainProduct->image);
            }
            $validated['image'] = $request->file('image')->store('main-products', 'public');
        }

        $mainProduct->update($validated);

        return redirect()->back()->with('success', 'Main Product updated successfully.');
    }

    public function destroy($id)
    {
        $mainProduct = MainProduct::findOrFail($id);
        if ($mainProduct->image) {
            Storage::disk('public')->delete($mainProduct->image);
        }
        $mainProduct->delete();

        return redirect()->back()->with('success', 'Main Product deleted successfully.');
    }
}
