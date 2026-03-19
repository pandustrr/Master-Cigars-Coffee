<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPackage extends Model
{
    protected $fillable = [
        'package_type',
        'customer_name',
        'whatsapp',
        'address',
        'payment_method',
        'total_price',
        'payment_proof',
        'sale_item_id',
        'status',
        'tracking_code',
    ];
}
