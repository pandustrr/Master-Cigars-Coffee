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
            'gallery.*' => 'nullable|image|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('main-products', 'public');
        }

        if ($request->hasFile('gallery')) {
            $gallery = [];
            foreach ($request->file('gallery') as $file) {
                $gallery[] = $file->store('main-products/gallery', 'public');
            }
            $validated['gallery'] = $gallery;
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
            'gallery.*' => 'nullable|image|max:2048',
            'deleted_gallery' => 'nullable|array', // List of paths to delete
        ]);

        // Main Image
        if ($request->hasFile('image')) {
            if ($mainProduct->image) {
                Storage::disk('public')->delete($mainProduct->image);
            }
            $validated['image'] = $request->file('image')->store('main-products', 'public');
        } else {
            unset($validated['image']);
        }

        // Handle Gallery Deletions
        $currentGallery = $mainProduct->gallery ?? [];
        if ($request->deleted_gallery) {
            foreach ($request->deleted_gallery as $path) {
                Storage::disk('public')->delete($path);
                $currentGallery = array_filter($currentGallery, fn($p) => $p !== $path);
            }
        }

        // Handle New Gallery Uploads
        if ($request->hasFile('gallery')) {
            foreach ($request->file('gallery') as $file) {
                $currentGallery[] = $file->store('main-products/gallery', 'public');
            }
        }
        
        $validated['gallery'] = array_values($currentGallery);

        $mainProduct->update($validated);

        return redirect()->back()->with('success', 'Main Product updated successfully.');
    }

    public function destroy($id)
    {
        $mainProduct = MainProduct::findOrFail($id);
        
        // Delete Main Image
        if ($mainProduct->image) {
            Storage::disk('public')->delete($mainProduct->image);
        }
        
        // Delete Gallery Images
        if ($mainProduct->gallery) {
            foreach ($mainProduct->gallery as $path) {
                Storage::disk('public')->delete($path);
            }
        }
        
        $mainProduct->delete();

        return redirect()->back()->with('success', 'Main Product deleted successfully.');
    }
}
