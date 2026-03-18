<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\SiteSetting;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class SettingController extends Controller
{
    public function index()
    {
        $settings = SiteSetting::all()->pluck('value', 'key');
        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        foreach ($data as $key => $value) {
            // Handle QRIS image upload
            if ($key === 'qris_image' && $request->hasFile('qris_image')) {
                // Delete old image if exists
                $oldPath = SiteSetting::getValue('qris_image');
                if ($oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
                
                $path = $request->file('qris_image')->store('settings', 'public');
                SiteSetting::setValue('qris_image', $path);
                continue;
            }

            // Skip keys that are not settings (like _method, or if we want better validation)
            if (in_array($key, [
                'bank_mandiri_norek', 
                'bank_mandiri_name', 
                'bank_bca_norek', 
                'bank_bca_name', 
                'whatsapp_admin'
            ])) {
                SiteSetting::setValue($key, $value);
            }
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}
