<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Investment extends Model
{
    protected $fillable = ['title', 'description', 'pdf_path'];
}
