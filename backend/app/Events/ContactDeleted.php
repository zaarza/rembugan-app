<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ContactDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $targetId;
    public $conversationId;
    public $contactId;

    /**
     * Create a new event instance.
     */
    public function __construct($targetId, $contactId, $conversationId = null)
    {
        $this->targetId = $targetId;
        $this->conversationId = $conversationId;
        $this->contactId = $contactId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new Channel($this->targetId),
        ];
    }

    public function broadcastAs(): string
    {
        return "ContactDeleted";
    }

    public function broadcastWith(): array
    {
        return [
            'contact_id' => $this->contactId,
            'conversation_id' => $this->conversationId
        ];
    }    
}
