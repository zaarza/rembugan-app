<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Inbox extends Model
{
    use HasFactory, HasUlids;
    protected $fillable = ['type', 'is_seen', 'receiver_id', 'sender_id', 'content'];
    protected $dateFormat = 'U';

    public function sender_details(): BelongsTo
    {
        return $this->belongsTo('users', 'id', 'sender_id');
    }
}
