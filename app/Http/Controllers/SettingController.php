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
        
        $settingsArray = $settings->toArray();
        if(isset($settingsArray['bank_accounts'])) {
            $settingsArray['bank_accounts'] = json_decode($settingsArray['bank_accounts'], true) ?? [];
        } else {
            $settingsArray['bank_accounts'] = [
                [
                    'bank' => 'Bank Mandiri',
                    'norek' => $settingsArray['bank_mandiri_norek'] ?? '',
                    'name' => $settingsArray['bank_mandiri_name'] ?? ''
                ],
                [
                    'bank' => 'Bank BCA',
                    'norek' => $settingsArray['bank_bca_norek'] ?? '',
                    'name' => $settingsArray['bank_bca_name'] ?? ''
                ]
            ];
        }

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settingsArray
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->all();

        $imageKeys = ['qris_image', 'hero_home', 'hero_about', 'hero_investment', 'hero_partners', 'hero_products'];
        $textKeys = ['whatsapp_admin'];

        foreach ($data as $key => $value) {
            // Handle image uploads
            if (in_array($key, $imageKeys) && $request->hasFile($key)) {
                $oldPath = SiteSetting::getValue($key);
                if ($oldPath) {
                    Storage::disk('public')->delete($oldPath);
                }
                
                $path = $request->file($key)->store('settings', 'public');
                SiteSetting::setValue($key, $path);
                continue;
            }

            // Handle text settings
            if (in_array($key, $textKeys)) {
                SiteSetting::setValue($key, $value);
            }
        }

        if ($request->has('bank_accounts')) {
            SiteSetting::setValue('bank_accounts', json_encode($request->input('bank_accounts')));
        }

        return redirect()->back()->with('success', 'Pengaturan berhasil diperbarui!');
    }
}
