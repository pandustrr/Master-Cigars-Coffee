<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\SaleController;
use App\Http\Controllers\Admin\AdminSaleController;
use App\Http\Controllers\Admin\VisualController;
use App\Http\Controllers\Admin\AdminProfileController;

Route::get('/', function () {
    return Inertia::render('Home');
})->name('home');

Route::get('/about', function () {
    return Inertia::render('About');
})->name('about');

Route::get('/product', [\App\Http\Controllers\ProductController::class, 'index'])->name('product');

Route::get('/partners', [\App\Http\Controllers\PartnersController::class, 'index'])->name('partners');

Route::get('/investment', function () {
    return Inertia::render('Investment', [
        'investments' => \App\Models\Investment::latest()->get()
    ]);
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
        $totalOrders = \App\Models\SalesOrder::count()
            + \App\Models\SalesPackage::count()
            + \App\Models\SalesPointCorner::count();

        return Inertia::render('Dashboard', [
            'stats' => [
                'totalOrders'   => $totalOrders,
                'totalProducts' => \App\Models\SaleItem::count(),
                'totalPartners' => \App\Models\Partner::count(),
                'totalBrands'   => \App\Models\MainProduct::count(),
            ],
        ]);
    })->name('dashboard');

    // Admin Sales Management
    Route::get('/admin/sales', [AdminSaleController::class, 'index'])->name('admin.sales.index');
    Route::patch('/admin/sales/status/{type}/{id}', [AdminSaleController::class, 'updateStatus'])->name('admin.sales.status.update');
    
    // Main Product Brand Management
    Route::get('/admin/main-products', [\App\Http\Controllers\Admin\AdminMainProductController::class, 'index'])->name('admin.main-products.index');
    Route::post('/admin/main-products', [\App\Http\Controllers\Admin\AdminMainProductController::class, 'store'])->name('admin.main-products.store');
    Route::post('/admin/main-products/{id}', [\App\Http\Controllers\Admin\AdminMainProductController::class, 'update'])->name('admin.main-products.update');
    Route::delete('/admin/main-products/{id}', [\App\Http\Controllers\Admin\AdminMainProductController::class, 'destroy'])->name('admin.main-products.destroy');

    // Category Management
    Route::get('/admin/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('admin.categories.index');
    Route::post('/admin/categories', [\App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('admin.categories.store');
    Route::delete('/admin/categories/{id}', [\App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('admin.categories.destroy');

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

    // Visual Management
    Route::get('/admin/visual', [VisualController::class, 'index'])->name('admin.visual.index');
    Route::post('/admin/visual', [VisualController::class, 'update'])->name('admin.visual.update');

    // Investment Management
    Route::get('/admin/investment', [\App\Http\Controllers\Admin\AdminInvestmentController::class, 'index'])->name('admin.investment.index');
    Route::post('/admin/investment', [\App\Http\Controllers\Admin\AdminInvestmentController::class, 'store'])->name('admin.investment.store');
    Route::post('/admin/investment/{id}', [\App\Http\Controllers\Admin\AdminInvestmentController::class, 'update'])->name('admin.investment.update');
    Route::delete('/admin/investment/{id}', [\App\Http\Controllers\Admin\AdminInvestmentController::class, 'destroy'])->name('admin.investment.destroy');

    // Admin Profile Management
    Route::get('/admin/profile', [AdminProfileController::class, 'edit'])->name('admin.profile.edit');
    Route::patch('/admin/profile', [AdminProfileController::class, 'update'])->name('admin.profile.update');
});

require __DIR__.'/auth.php';
