<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPackage extends Model
{
    protected $fillable = [
        'address',
        'payment_method',
        'total_price',
        'sale_item_id',
    ];
}
