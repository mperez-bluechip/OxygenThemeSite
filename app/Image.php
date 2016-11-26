<?php

namespace App;


class Image extends Eloquent
{
    protected $fillable = [
        'name', 'comments', 'type',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [

    ];
}
