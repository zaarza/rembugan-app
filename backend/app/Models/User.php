<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasManyThrough;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasUlids;

    /* Change default timestamp column name */
    const CREATED_AT = 'joined_at';
    const UPDATED_AT = null;


    protected $dateFormat = 'U';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $guarded = [
        'id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed',
    ];

    public function contacts(): HasMany 
    {
        return $this->hasMany(Contact::class, 'added_by', 'id');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(Message::class, 'receiver_id', 'id');
    }

    public function inbox(): HasMany
    {
        return $this->hasMany(Inbox::class, 'receiver_id', 'id');
    }

    public function groups(): HasManyThrough
    {
        return $this->hasManyThrough(Group::class, GroupMember::class, 'user_id', 'id', 'id', 'group_id');
    }

    public function conversations(): HasManyThrough
    {
        return $this->hasManyThrough(Conversation::class, ConversationParticipant::class, 'user_id', 'id', 'id', 'conversation_id');
    }
}
