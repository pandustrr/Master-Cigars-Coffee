<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SaleItem extends Model
{
    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
        'category',
    ];
}
