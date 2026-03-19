<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesPointCorner extends Model
{
    protected $fillable = [
        'service_type',
        'customer_name',
        'whatsapp',
        'additional_info',
        'total_price',
        'payment_proof',
        'sale_item_id',
        'status',
        'tracking_code',
    ];
}
