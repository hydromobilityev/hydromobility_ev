<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CorporateCustomer extends Model
{

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'phone_with_code',
        'phone_number',
        'email',
        'designation',
        'address',
        'company_name',
        'status',
        'username',
        'password',
        'profile_image',
        'registration_number',
        'vat_number',
    ];
}
