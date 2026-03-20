<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\SaleItem;

class SaleItemSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            [
                'name' => 'Single Pack Robusta',
                'price' => 45000,
                'description' => 'Paket eceran kopi robusta 250gr.',
                'specifications' => ['250 Gram', 'Roasting Medium', 'Bubuk Halus'],
                'image' => null,
                'category' => 'Retail',
                'stock' => 50
            ],
            [
                'name' => 'Paket Sultan Exclusive',
                'price' => 250000,
                'description' => 'Paket bundling kopi dan cerutu eksklusif sultan.',
                'specifications' => ['1 Box Cerutu', '500gr Arabica', 'Free Lighter', 'Premium Box'],
                'image' => null,
                'category' => 'Package',
                'stock' => 10
            ],
            [
                'name' => 'Full Facility Point',
                'price' => 750000,
                'description' => 'Layanan point corner dengan fasilitas lengkap.',
                'specifications' => ['Unlimitied Coffee', 'Smoking Area', 'Meeting Room', 'Free WiFi'],
                'image' => null,
                'category' => 'Point Corner',
                'stock' => 5
            ]
        ];

        foreach ($items as $item) {
            SaleItem::create($item);
        }
    }
}
