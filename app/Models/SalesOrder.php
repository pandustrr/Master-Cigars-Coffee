<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SalesOrder extends Model
{
    protected $fillable = [
        'total_price',
        'customer_name',
        'address',
        'sale_item_id',
    ];
}
