<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\SalesOrder;
use App\Models\SalesPackage;
use App\Models\SalesPointCorner;
use App\Models\SaleItem;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminSaleController extends Controller
{
    public function index()
    {
        // Auto-sync categories from sale items if they don't exist in categories table
        $itemCategories = SaleItem::distinct()->pluck('category')->filter()->toArray();
        foreach ($itemCategories as $catName) {
            \App\Models\Category::firstOrCreate(['name' => $catName]);
        }

        return Inertia::render('Admin/Sales/Index', [
            'retailOrders' => SalesOrder::latest()->get(),
            'packageOrders' => SalesPackage::latest()->get(),
            'pointCornerOrders' => SalesPointCorner::latest()->get(),
            'saleItems' => SaleItem::latest()->get(),
            'categories' => \App\Models\Category::all(),
        ]);
    }

    public function updateStatus(Request $request, $type, $id)
    {
        $validated = $request->validate([
            'status' => 'required|string',
        ]);

        $order = null;
        if ($type === 'retail') {
            $order = SalesOrder::findOrFail($id);
        } elseif ($type === 'package') {
            $order = SalesPackage::findOrFail($id);
        } elseif ($type === 'point-corner') {
            $order = SalesPointCorner::findOrFail($id);
        }

        if ($order) {
            $oldStatus = trim($order->status);
            $newStatus = trim($validated['status']);
            
            $reduceStatuses = ['Diproses', 'Dikirim', 'Selesai'];
            
            // Logika Pengurangan Stok
            // Jika status baru adalah status berkurang DAN status lama BUKAN status berkurang
            if (in_array($newStatus, $reduceStatuses) && !in_array($oldStatus, $reduceStatuses)) {
                if ($order->sale_item_id) {
                    $item = \App\Models\SaleItem::find($order->sale_item_id);
                    if ($item) {
                        $qty = $order->quantity ?? 1;
                        $item->stock = max(0, $item->stock - $qty);
                        $item->save();
                    }
                }
            }
            
            // Logika Pengembalian Stok (Restock)
            // Jika status lama adalah status berkurang DAN status baru BUKAN status berkurang
            if (in_array($oldStatus, $reduceStatuses) && !in_array($newStatus, $reduceStatuses)) {
                if ($order->sale_item_id) {
                    $item = \App\Models\SaleItem::find($order->sale_item_id);
                    if ($item) {
                        $qty = $order->quantity ?? 1;
                        $item->increment('stock', $qty);
                    }
                }
            }

            $order->status = $newStatus;
            $order->save();
        }

        return redirect()->back()->with('success', 'Status pesanan berhasil diperbarui!');
    }

    // Catalog Management
    public function storeItem(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string',
            'stock' => 'required|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('sales', 'public');
        }

        SaleItem::create($validated);

        return redirect()->back()->with('success', 'Item marketplace berhasil ditambahkan.');
    }

    public function updateItem(Request $request, $id)
    {
        $item = SaleItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'specifications' => 'nullable|array',
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string',
            'stock' => 'required|integer|min:0',
        ]);

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $validated['image'] = $request->file('image')->store('sales', 'public');
        } else {
            unset($validated['image']);
        }

        $item->update($validated);

        return redirect()->back()->with('success', 'Item marketplace berhasil diperbarui.');
    }

    public function destroyItem($id)
    {
        $item = SaleItem::findOrFail($id);
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();

        return redirect()->back()->with('success', 'Item marketplace berhasil dihapus.');
    }
}
