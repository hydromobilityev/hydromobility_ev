<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Customer extends Model
{
    // Add this method to apply the global scope
    protected static function booted()
    {
        static::addGlobalScope('notDeleted', function (Builder $builder) {
            $builder->where('is_deleted', 0);
        });
    }

    // Optional: Add a method to include deleted rows in specific queries
    public function scopeWithDeleted($query)
    {
        return $query->withoutGlobalScope('notDeleted');
    }

    protected $fillable = [
        'id',
        'first_name',
        'last_name',
        'phone_number',
        'email',
        'email_verification_status',
        'email_verification_code',
        'password',
        'profile_picture',
        'status',
        'country_code',
        'phone_with_code',
        'fcm_token',
        'wallet',
        'gender',
        'email_verification_status',
        'email_verification_code',
        'overall_ratings',
        'no_of_ratings',
        'current_sub_id',
        'subscription_trips',
        'sub_purchased_at',
        'sub_expired_at',
        'is_deleted',
        'corporate_customer_id',
        'group_id',
    ];
}
