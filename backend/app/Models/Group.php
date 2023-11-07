<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Group extends Model
{
    use HasFactory, HasUlids;
    protected $dateFormat = 'U';
    protected $fillable = [
        'name',
        'description',
        'avatar',
        'created_by',
    ];
    const UPDATED_AT = null;

    protected $with = ['members', 'messages'];

    public function members(): HasMany
    {
        return $this->hasMany(GroupMember::class, 'group_id', 'id');
    }

    public function admin(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id', 'created_by');
    }

    public function messages(): HasMany
    {
        return $this->hasMany(GroupMessage::class, 'group_id', 'id');
    }
}
