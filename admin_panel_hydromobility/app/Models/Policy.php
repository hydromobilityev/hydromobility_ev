<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Policy extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'title',
        'short_description',
        'long_description',
        'title_ar',
        'short_description_ar',
        'long_description_ar',
        'corporate_customer_id',
        'status'
    ];
}
