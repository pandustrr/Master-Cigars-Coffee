<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Investment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class AdminInvestmentController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Investment/Index', [
            'investments' => Investment::latest()->get()
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pdf_file' => 'required|file|mimes:pdf|max:10240',
        ]);

        $path = $request->file('pdf_file')->store('investments', 'public');

        Investment::create([
            'title' => $validated['title'],
            'description' => $validated['description'],
            'pdf_path' => $path,
        ]);

        return redirect()->back()->with('success', 'Dokumen investasi berhasil diunggah.');
    }

    public function update(Request $request, $id)
    {
        $investment = Investment::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'pdf_file' => 'nullable|file|mimes:pdf|max:10240',
        ]);

        $data = [
            'title' => $validated['title'],
            'description' => $validated['description'],
        ];

        if ($request->hasFile('pdf_file')) {
            // Delete old file
            if ($investment->pdf_path) {
                Storage::disk('public')->delete($investment->pdf_path);
            }
            $data['pdf_path'] = $request->file('pdf_file')->store('investments', 'public');
        }

        $investment->update($data);

        return redirect()->back()->with('success', 'Investasi berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $investment = Investment::findOrFail($id);
        
        if ($investment->pdf_path) {
            Storage::disk('public')->delete($investment->pdf_path);
        }
        
        $investment->delete();

        return redirect()->back()->with('success', 'Investasi berhasil dihapus.');
    }
}
