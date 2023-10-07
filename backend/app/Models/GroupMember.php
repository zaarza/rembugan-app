<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class GroupMember extends Model
{
    use HasFactory, HasUlids;

    const CREATED_AT = 'joined_at';
    const UPDATED_AT = null;
    protected $dateFormat = 'U';
    
    protected $fillable = [
        'group_id',
        'user_id',
        'is_admin'
    ];

    public function group(): BelongsTo 
    {
        return $this->belongsTo(Group::class, 'id', 'group_id');
    }

    public function details(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'user_id');
    }
}
