<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SaleController;
use App\Http\Controllers\Admin\AdminSaleController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/product', [\App\Http\Controllers\ProductController::class, 'index'])->name('product');

Route::get('/partners', [\App\Http\Controllers\PartnersController::class, 'index'])->name('partners');

Route::get('/investment', function () {
    return Inertia::render('Investment');
})->name('investment');

// Sale Routes
Route::prefix('sale')->group(function () {
    Route::get('/', [SaleController::class, 'index'])->name('sale.index');
    Route::post('/retail', [SaleController::class, 'retailStore'])->name('sale.retail.store');
    Route::post('/package', [SaleController::class, 'packageStore'])->name('sale.package.store');
    Route::post('/point-corner', [SaleController::class, 'pointCornerStore'])->name('sale.point-corner.store');
    
    // Invoice & Payment
    Route::get('/invoice/{type}/{id}', [SaleController::class, 'invoice'])->name('sale.invoice');
    Route::post('/payment-proof', [SaleController::class, 'uploadPaymentProof'])->name('sale.payment-proof.store');

    // Tracking
    Route::get('/tracking', [SaleController::class, 'trackingPage'])->name('sale.tracking');
    Route::post('/tracking', [SaleController::class, 'track'])->name('sale.tracking.track');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Admin Sales Management
    Route::get('/admin/sales', [AdminSaleController::class, 'index'])->name('admin.sales.index');
    Route::patch('/admin/sales/status/{type}/{id}', [AdminSaleController::class, 'updateStatus'])->name('admin.sales.status.update');
    
    // Catalog Items (Retail/Package/Point items)
    Route::post('/admin/sales/items', [AdminSaleController::class, 'storeItem'])->name('admin.sales.items.store');
    Route::post('/admin/sales/items/{id}', [AdminSaleController::class, 'updateItem'])->name('admin.sales.items.update');
    Route::delete('/admin/sales/items/{id}', [AdminSaleController::class, 'destroyItem'])->name('admin.sales.items.destroy');

    // Product Management
    Route::get('/admin/products', [\App\Http\Controllers\Admin\AdminProductController::class, 'index'])->name('admin.products.index');
    Route::post('/admin/products', [\App\Http\Controllers\Admin\AdminProductController::class, 'store'])->name('admin.products.store');
    Route::post('/admin/products/{id}', [\App\Http\Controllers\Admin\AdminProductController::class, 'update'])->name('admin.products.update');
    Route::delete('/admin/products/{id}', [\App\Http\Controllers\Admin\AdminProductController::class, 'destroy'])->name('admin.products.destroy');

    // Partner Management
    Route::get('/admin/partners', [\App\Http\Controllers\Admin\AdminPartnerController::class, 'index'])->name('admin.partners.index');
    Route::post('/admin/partners', [\App\Http\Controllers\Admin\AdminPartnerController::class, 'store'])->name('admin.partners.store');
    Route::post('/admin/partners/{id}', [\App\Http\Controllers\Admin\AdminPartnerController::class, 'update'])->name('admin.partners.update');
    Route::delete('/admin/partners/{id}', [\App\Http\Controllers\Admin\AdminPartnerController::class, 'destroy'])->name('admin.partners.destroy');

    // Site Settings
    Route::get('/admin/settings', [\App\Http\Controllers\SettingController::class, 'index'])->name('admin.settings.index');
    Route::post('/admin/settings', [\App\Http\Controllers\SettingController::class, 'update'])->name('admin.settings.update');
});

require __DIR__.'/auth.php';
