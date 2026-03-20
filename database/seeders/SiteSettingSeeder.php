<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SiteSetting;

class SiteSettingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $settings = [
            'bank_mandiri_norek' => '1234567890123',
            'bank_mandiri_name' => 'MASTER CIGARS & COFFEE',
            'bank_bca_norek' => '888999111222',
            'bank_bca_name' => 'MASTER CIGARS & COFFEE',
            'qris_image' => null,
            'whatsapp_admin' => '6281234567890',
            'hero_home' => null,
            'hero_about' => null,
            'hero_investment' => null,
            'hero_partners' => null,
            'hero_products' => null,
            'site_logo' => null,
            'site_favicon' => null,
            'about_story_image' => null,
            'home_quote_bg' => null,
            'investment_context_bg' => null,
            'site_address' => 'Gebang Tengah, Gebang, Kec. Patrang, Kabupaten Jember, Jawa Timur 68117',
        ];

        foreach ($settings as $key => $value) {
            SiteSetting::updateOrCreate(['key' => $key], ['value' => $value]);
        }
    }
}
