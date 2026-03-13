<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/product', function () {
    return Inertia::render('Product');
})->name('product');

Route::get('/partners', function () {
    return Inertia::render('Partners');
})->name('partners');

Route::get('/investment', function () {
    return Inertia::render('Investment');
})->name('investment');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

require __DIR__.'/auth.php';
