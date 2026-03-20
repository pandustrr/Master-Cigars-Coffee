<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PartnerCategory;
use Inertia\Inertia;

class PartnerCategoryController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        PartnerCategory::create($validated);

        return redirect()->back()->with('success', 'Partner category created successfully.');
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        PartnerCategory::findOrFail($id)->update($validated);

        return redirect()->back()->with('success', 'Partner category updated successfully.');
    }

    public function destroy($id)
    {
        PartnerCategory::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Partner category deleted successfully.');
    }
}
