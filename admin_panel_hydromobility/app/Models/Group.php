<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Group extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'corporate_customer_id',
        'parent_id',
        'group_name',
        'policy_id',
        'group_description',
        'status',
        'group_name_ar',
        'group_description_ar',
        'created_at',
        'updated_at'
    ];
}
