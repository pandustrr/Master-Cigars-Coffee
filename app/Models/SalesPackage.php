<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPackage extends Model
{
    protected $guarded = [];

    public function saleItem()
    {
        return $this->belongsTo(SaleItem::class);
    }
}
