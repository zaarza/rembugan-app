<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'description' => $this->description,
            'status' => $this->status,
            'avatar' => $this->avatar,
            'is_online' => $this->is_online,
            'last_seen' => $this->last_seen,
            'joined_at' => $this->joined_at,
        ];
    }
}
