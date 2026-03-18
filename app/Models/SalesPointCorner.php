<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPointCorner extends Model
{
    protected $fillable = [
        'additional_info',
        'total_price',
        'payment_proof',
        'sale_item_id',
    ];
}
