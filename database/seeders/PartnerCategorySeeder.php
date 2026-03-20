<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PartnerCategory;

class PartnerCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            'Petani',
            'Marketing Agency',
            'Tour Travel',
            'Horeka',
            'UMKM'
        ];

        foreach ($categories as $category) {
            PartnerCategory::updateOrCreate(['name' => $category]);
        }
    }
}
