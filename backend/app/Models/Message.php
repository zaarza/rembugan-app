<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory, HasUlids;
    protected $dateFormat = 'U';
    const CREATED_AT = 'sent_at';
    const UPDATED_AT = null;

    protected $fillable = [
        'content',
        'receiver_id',
        'sender_id'
    ];

    protected $guarded = [
        'id'
    ];
}
