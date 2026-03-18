<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class HowItWork extends Model
{
     protected $fillable = [
        'id','title','description','icon','created_at','updated-at',
    ];
}
