<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Inertia\Inertia;

class PartnersController extends Controller
{
    public function index()
    {
        return Inertia::render('Partners', [
            'partners' => Partner::latest()->get()
        ]);
    }
}
