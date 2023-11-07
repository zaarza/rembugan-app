<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ConversationParticipant extends Model
{
    use HasFactory, HasUlids;

    // * CONFIGURATION
    // Disable timestamp
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $guarded = ['id'];
}
