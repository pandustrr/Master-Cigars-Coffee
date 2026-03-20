<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Carbon\Carbon;
use App\Models\Product;
use App\Models\Investment;
use App\Models\SaleItem;
use App\Models\Partner;
use App\Models\MainProduct;

class SitemapController extends Controller
{
    public function index()
    {
        $urls = [
            [
                'loc'        => route('home'),
                'lastmod'    => Carbon::now()->toAtomString(),
                'changefreq' => 'daily',
                'priority'   => '1.0',
            ],
            [
                'loc'        => route('about'),
                'lastmod'    => Carbon::now()->subMonths(1)->toAtomString(),
                'changefreq' => 'monthly',
                'priority'   => '0.8',
            ],
            [
                'loc'        => route('product'),
                'lastmod'    => Product::latest()->first()?->updated_at?->toAtomString() ?? (MainProduct::latest()->first()?->updated_at?->toAtomString() ?? Carbon::now()->toAtomString()),
                'changefreq' => 'daily',
                'priority'   => '0.9',
            ],
            [
                'loc'        => route('partners'),
                'lastmod'    => Partner::latest()->first()?->updated_at?->toAtomString() ?? Carbon::now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority'   => '0.7',
            ],
            [
                'loc'        => route('investment'),
                'lastmod'    => Investment::latest()->first()?->updated_at?->toAtomString() ?? Carbon::now()->toAtomString(),
                'changefreq' => 'weekly',
                'priority'   => '0.8',
            ],
            [
                'loc'        => route('sale.index'),
                'lastmod'    => SaleItem::latest()->first()?->updated_at?->toAtomString() ?? Carbon::now()->toAtomString(),
                'changefreq' => 'daily',
                'priority'   => '0.9',
            ]
        ];

        return response()->view('sitemap', compact('urls'))->header('Content-Type', 'text/xml');
    }
}
