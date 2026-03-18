<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Driver extends Model
{
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
        'id', 'first_name','last_name','phone_number','phone_with_code','email','password','date_of_birth','licence_number','fcm_token','overall_ratings', 'no_of_ratings','shared_ride_status','status','id_proof_status','referral_code','refered_by','driver_hiring_status','daily_ride_status','rental_ride_status','outstation_ride_status','gth_lat','gth_lng','gth_location','gth_status','is_deleted'
    ];
}
