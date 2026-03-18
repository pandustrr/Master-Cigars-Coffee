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
        return Inertia::render('Admin/Sales/Index', [
            'retailOrders' => SalesOrder::latest()->get(),
            'packageOrders' => SalesPackage::latest()->get(),
            'pointCornerOrders' => SalesPointCorner::latest()->get(),
            'saleItems' => SaleItem::latest()->get(),
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
            $order->update(['status' => $validated['status']]);
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
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            $validated['image'] = $request->file('image')->store('sales', 'public');
        }

        SaleItem::create($validated);

        return redirect()->back()->with('success', 'Catalog item added successfully.');
    }

    public function updateItem(Request $request, $id)
    {
        $item = SaleItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'category' => 'required|string',
        ]);

        if ($request->hasFile('image')) {
            if ($item->image) {
                Storage::disk('public')->delete($item->image);
            }
            $validated['image'] = $request->file('image')->store('sales', 'public');
        }

        $item->update($validated);

        return redirect()->back()->with('success', 'Catalog item updated successfully.');
    }

    public function destroyItem($id)
    {
        $item = SaleItem::findOrFail($id);
        if ($item->image) {
            Storage::disk('public')->delete($item->image);
        }
        $item->delete();

        return redirect()->back()->with('success', 'Catalog item deleted successfully.');
    }
}
