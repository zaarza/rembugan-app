<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Conversation extends Model
{
    use HasFactory, HasUlids;

    // * CONFIGURATION
    // Disable timestamp
    const CREATED_AT = null;
    const UPDATED_AT = null;

    protected $guarded = ['id'];

    
    // * RELATIONSHIP
    protected $with = ['participants', 'chats'];
    
    public function participants(): HasMany
    {
        return $this->hasMany(ConversationParticipant::class, 'conversation_id', 'id');
    }

    public function chats(): HasMany
    {
        return $this->hasMany(ConversationChat::class, 'conversation_id', 'id');
    }
}
