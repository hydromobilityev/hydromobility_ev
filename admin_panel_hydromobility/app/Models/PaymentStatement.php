<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PaymentStatement extends Model
{
    protected $table = 'payment_statements';

    protected $fillable = [
        'corporate_customer_id',
        'payment_period',
        'sub_total',
        'tax',
        'total',
        'service_fee',
        'status',
        'created_at',
        'updated_at',
    ];
    public $timestamps = false;
}
