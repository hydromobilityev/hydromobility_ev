<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class CorporateAgent extends Model
{

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'phone_with_code',
        'phone_number',
        'email',
        'address',
        'company_name',
        'status',
        'username',
        'password',
        'profile_picture',
        'corporate_customer_id'
    ];
}
