<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    protected $fillable = [
        'product_photo',
        'price',
        'quantity',
        'total_price',
        'customer_name',
        'address',
        'whatsapp',
        'shipping_choice',
        'payment_method',
        'payment_proof',
        'sale_item_id',
        'status',
        'tracking_code',
    ];
}
