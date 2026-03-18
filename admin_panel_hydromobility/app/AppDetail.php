<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AppDetail extends Model
{
     protected $fillable = [
        'id','title','description','icon','created_at','updated-at',
    ];
}
