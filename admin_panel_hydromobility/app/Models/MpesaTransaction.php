<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MpesaTransaction extends Model
{
    protected $fillable = [
        'id',
        'customer_id',
        'payment_id',
        'payment_ref',
        'payment_status',
        'phone_with_code',
        'payment_statement_id'
    ];
}
