<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CorporateCustomerRequest extends Model
{
    
    protected $fillable = [
        'id', 'first_name','last_name','phone_with_code','phone_number','company_email','designation','address','company_name','status',
    ];
}
