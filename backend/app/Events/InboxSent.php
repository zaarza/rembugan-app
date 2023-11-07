<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class InboxSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $inbox;
    public $targetId;
    /**
     * Create a new event instance.
     */
    public function __construct($targetId, $inbox)
    {
        $this->inbox = $inbox;
        $this->targetId = $targetId;
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
        return "InboxSent";
    }

    public function broadcastWith(): array
    {
        return $this->inbox;
    }
}
