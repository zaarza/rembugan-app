<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationChat extends Model
{
    use HasFactory, HasUlids;

     // * CONFIGURATION
    // Timestamp
    protected $dateFormat = 'U';
    const CREATED_AT = 'sent_at';
    const UPDATED_AT = null;

    protected $guarded = ['id'];
}
