<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return Inertia::render('Product', [
            'products' => \App\Models\Product::latest()->get(),
            'mainProducts' => \App\Models\MainProduct::latest()->get(),
        ]);
    }
}
