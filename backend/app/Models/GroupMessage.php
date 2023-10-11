<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class GroupMessage extends Model
{
    use HasFactory, HasUlids;
    protected $dateFormat = 'U';
    protected $fillable = [
        'content',
        'sender_id',
        'group_id',
    ];
    const UPDATED_AT = null;
    const CREATED_AT = 'sent_at';

    public function group(): BelongsTo
    {
        return $this->belongsTo(Group::class, 'id', 'group_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'sender_id');
    }
}
