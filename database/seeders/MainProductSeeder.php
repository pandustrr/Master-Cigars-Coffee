<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\MainProduct;

class MainProductSeeder extends Seeder
{
    public function run(): void
    {
        $products = [
            [
                'name' => 'Master Robusta Premium',
                'category' => 'Coffee',
                'description' => 'Biji kopi robusta pilihan dari dataran tinggi dengan proses roasting medium-dark.',
                'image' => null,
                'gallery' => []
            ],
            [
                'name' => 'Master Arabica Specialty',
                'category' => 'Coffee',
                'description' => 'Kopi Arabika murni dengan aroma buah yang khas dan tingkat keasaman yang seimbang.',
                'image' => null,
                'gallery' => []
            ],
            [
                'name' => 'Classic Master Cigar',
                'category' => 'Cigar',
                'description' => 'Cerutu buatan tangan dengan tembakau berkualitas tinggi untuk pengalaman merokok yang halus.',
                'image' => null,
                'gallery' => []
            ]
        ];

        foreach ($products as $product) {
            MainProduct::create($product);
        }
    }
}
