<?php

namespace App\Events;

use App\Http\Resources\GroupMessageResource;
use Illuminate\Broadcasting\Channel;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class GroupMessageSent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $groupId;
    public $message;

    /**
     * Create a new event instance.
     */
    public function __construct($groupId, $message)
    {
        $this->groupId = $groupId;
        $this->message = $message;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PresenceChannel('group.' . $this->groupId),
        ];
    }

    /**
     * Data to send
     */
    public function broadcastWith(): array
    {
        return $this->message;
    }

    /**
     * Event name
     */
    public function broadcastAs(): string
    {
        return "GroupMessageSent";
    }
}
