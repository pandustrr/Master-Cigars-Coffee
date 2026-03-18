<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\SalesOrder;
use App\Models\SalesPackage;
use App\Models\SalesPointCorner;
use Inertia\Inertia;

class SaleController extends Controller
{
    private function generateTrackingCode()
    {
        return 'MST-' . strtoupper(bin2hex(random_bytes(3))); // e.g. MST-A1B2C3
    }

    public function index()
    {
        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        
        $settingsArray = $settings->toArray();
        if (isset($settingsArray['bank_accounts'])) {
            $settingsArray['bank_accounts'] = json_decode($settingsArray['bank_accounts'], true) ?? [];
        } else {
            $settingsArray['bank_accounts'] = [
                [
                    'bank' => 'Bank Mandiri',
                    'norek' => $settingsArray['bank_mandiri_norek'] ?? '',
                    'name' => $settingsArray['bank_mandiri_name'] ?? ''
                ],
                [
                    'bank' => 'Bank BCA',
                    'norek' => $settingsArray['bank_bca_norek'] ?? '',
                    'name' => $settingsArray['bank_bca_name'] ?? ''
                ]
            ];
        }

        return Inertia::render('Sale/Index', [
            'saleItems' => \App\Models\SaleItem::latest()->get(),
            'settings' => $settingsArray
        ]);
    }

    public function retailStore(Request $request)
    {
        $validated = $request->validate([
            'foto_produk' => 'nullable|image|max:2048',
            'harga' => 'required|numeric',
            'jumlah_beli' => 'required|integer',
            'nama_lengkap' => 'required|string',
            'alamat_lengkap' => 'required|string',
            'nomor_whatsapp' => 'required|string',
            'pilihan_pengiriman' => 'required|string',
            'metode_pembayaran' => 'required|string',
            'payment_proof' => 'required|image|max:2048',
            'sale_item_id' => 'required|integer',
        ]);

        $photoPath = null;
        if ($request->hasFile('foto_produk')) {
            $photoPath = $request->file('foto_produk')->store('products', 'public');
        }

        $proofPath = null;
        if ($request->hasFile('payment_proof')) {
            $proofPath = $request->file('payment_proof')->store('payment_proofs', 'public');
        }

        $order = SalesOrder::create([
            'product_photo' => $photoPath,
            'price' => $validated['harga'],
            'quantity' => $validated['jumlah_beli'],
            'total_price' => $validated['harga'] * $validated['jumlah_beli'],
            'customer_name' => $validated['nama_lengkap'],
            'address' => $validated['alamat_lengkap'],
            'whatsapp' => $validated['nomor_whatsapp'],
            'shipping_choice' => $validated['pilihan_pengiriman'],
            'payment_method' => $validated['metode_pembayaran'],
            'payment_proof' => $proofPath,
            'sale_item_id' => $validated['sale_item_id'],
            'status' => 'Menunggu Konfirmasi',
            'tracking_code' => $this->generateTrackingCode(),
        ]);

        return redirect()->route('sale.invoice', ['type' => 'retail', 'id' => $order->id]);
    }

    public function packageStore(Request $request)
    {
        $validated = $request->validate([
            'package_type' => 'required|string',
            'nama' => 'required|string',
            'whatsapp' => 'required|string',
            'alamat' => 'required|string',
            'metode_pembayaran' => 'required|string',
            'price' => 'nullable|numeric',
            'payment_proof' => 'required|image|max:2048',
            'sale_item_id' => 'required|integer',
        ]);

        $proofPath = null;
        if ($request->hasFile('payment_proof')) {
            $proofPath = $request->file('payment_proof')->store('payment_proofs', 'public');
        }

        $order = SalesPackage::create([
            'package_type' => $validated['package_type'],
            'customer_name' => $validated['nama'],
            'whatsapp' => $validated['whatsapp'],
            'address' => $validated['alamat'],
            'payment_method' => $validated['metode_pembayaran'],
            'total_price' => $validated['price'] ?? 0,
            'payment_proof' => $proofPath,
            'sale_item_id' => $validated['sale_item_id'],
            'status' => 'Menunggu Konfirmasi',
            'tracking_code' => $this->generateTrackingCode(),
        ]);

        return redirect()->route('sale.invoice', ['type' => 'package', 'id' => $order->id]);
    }

    public function pointCornerStore(Request $request)
    {
        $validated = $request->validate([
            'service_type' => 'required|string',
            'nama' => 'required|string',
            'whatsapp' => 'required|string',
            'keterangan' => 'nullable|string',
            'price' => 'nullable|numeric',
            'payment_proof' => 'required|image|max:2048',
            'sale_item_id' => 'required|integer',
        ]);

        $proofPath = null;
        if ($request->hasFile('payment_proof')) {
            $proofPath = $request->file('payment_proof')->store('payment_proofs', 'public');
        }

        $order = SalesPointCorner::create([
            'service_type' => $validated['service_type'],
            'customer_name' => $validated['nama'],
            'whatsapp' => $validated['whatsapp'],
            'additional_info' => $validated['keterangan'],
            'total_price' => $validated['price'] ?? 0,
            'payment_proof' => $proofPath,
            'sale_item_id' => $validated['sale_item_id'],
            'status' => 'Menunggu Konfirmasi',
            'tracking_code' => $this->generateTrackingCode(),
        ]);

        return redirect()->route('sale.invoice', ['type' => 'point-corner', 'id' => $order->id]);
    }

    public function invoice($type, $id)
    {
        $order = null;
        if ($type === 'retail') {
            $order = SalesOrder::findOrFail($id);
        } elseif ($type === 'package') {
            $order = SalesPackage::findOrFail($id);
        } elseif ($type === 'point-corner') {
            $order = SalesPointCorner::findOrFail($id);
        }

        $settings = \App\Models\SiteSetting::all()->pluck('value', 'key');
        
        $settingsArray = $settings->toArray();
        if (isset($settingsArray['bank_accounts'])) {
            $settingsArray['bank_accounts'] = json_decode($settingsArray['bank_accounts'], true) ?? [];
        } else {
            $settingsArray['bank_accounts'] = [
                [
                    'bank' => 'Bank Mandiri',
                    'norek' => $settingsArray['bank_mandiri_norek'] ?? '',
                    'name' => $settingsArray['bank_mandiri_name'] ?? ''
                ],
                [
                    'bank' => 'Bank BCA',
                    'norek' => $settingsArray['bank_bca_norek'] ?? '',
                    'name' => $settingsArray['bank_bca_name'] ?? ''
                ]
            ];
        }

        return Inertia::render('Sale/Invoice', [
            'order' => $order,
            'type' => $type,
            'settings' => $settingsArray
        ]);
    }

    public function uploadPaymentProof(Request $request)
    {
        $request->validate([
            'type' => 'required|string',
            'id' => 'required|integer',
            'payment_proof' => 'required|image|max:2048',
        ]);

        $path = $request->file('payment_proof')->store('payment_proofs', 'public');

        $order = null;
        if ($request->type === 'retail') {
            $order = SalesOrder::findOrFail($request->id);
        } elseif ($request->type === 'package') {
            $order = SalesPackage::findOrFail($request->id);
        } elseif ($request->type === 'point-corner') {
            $order = SalesPointCorner::findOrFail($request->id);
        }

        $order->update([
            'payment_proof' => $path,
            'status' => 'Menunggu Konfirmasi'
        ]);

        return redirect()->back()->with('success', 'Bukti pembayaran berhasil diunggah!');
    }

    public function trackingPage()
    {
        return Inertia::render('Sale/Tracking');
    }

    public function track(Request $request)
    {
        $request->validate(['code' => 'required|string']);
        $code = $request->code;

        $order = SalesOrder::where('tracking_code', $code)->first() 
                 ?? SalesPackage::where('tracking_code', $code)->first() 
                 ?? SalesPointCorner::where('tracking_code', $code)->first();

        if (!$order) {
            return redirect()->back()->withErrors(['code' => 'Kode pelacakan tidak ditemukan.']);
        }

        // Determine type for frontend
        $type = 'retail';
        if ($order instanceof SalesPackage) $type = 'package';
        if ($order instanceof SalesPointCorner) $type = 'point-corner';

        return Inertia::render('Sale/Tracking', [
            'order' => $order,
            'type' => $type
        ]);
    }
}
