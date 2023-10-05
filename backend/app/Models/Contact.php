<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Contact extends Model
{
    use HasFactory;

    const CREATED_AT = 'added_at';
    const UPDATED_AT = null;
    protected $dateFormat = 'U';

    protected $fillable = [
        'user_id',
        'added_by',
    ];

    public function details(): HasOne
    {
        return $this->hasOne(User::class, 'id', 'user_id');
    }
}
