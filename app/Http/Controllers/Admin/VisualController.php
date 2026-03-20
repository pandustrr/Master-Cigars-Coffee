<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class VisualController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Visual/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->all();
        $imageKeys = [
            'hero_home', 'hero_about', 'hero_investment', 'hero_partners', 'hero_products',
            'site_logo', 'site_favicon', 'about_story_image', 'about_story_badge', 
            'about_story_sub_1', 'about_story_sub_2', 'home_quote_bg', 'investment_context_bg'
        ];

        foreach ($data as $key => $value) {
            // Handle image uploads
            if (in_array($key, $imageKeys) && $request->hasFile($key)) {
                // Delete old image if exists
                $oldPath = SiteSetting::getValue($key);
                if ($oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
                
                $path = $request->file($key)->store('settings', 'public');
                SiteSetting::setValue($key, $path);
            }
        }

        return redirect()->back()->with('success', 'Visual assets updated successfully!');
    }
}
