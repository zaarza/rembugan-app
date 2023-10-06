<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Message;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class MessageTest extends TestCase
{
    public function testSendMessage() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // add to contacts
        Contact::create([
            'user_id' => $user2->id,
            'added_by' => $user1->id
        ]);
        Contact::create([
            'user_id' => $user1->id,
            'added_by' => $user2->id
        ]);

        // make sure user1 & user2 message is empty
        $this->assertEmpty(Message::where('sender_id', $user1->id)->first());

        $message = [
            'content' => 'Hello World!',
            'receiver_id' => $user2->id
        ];
        
        Sanctum::actingAs($user1);
        $this->post('/api/messages/', $message, [
            'accept' => 'application/json',
            'content' => 'application/json'
        ])->assertStatus(201);

        $this->assertNotEmpty(Message::where('sender_id', $user1->id)->first());
    }

    public function testSendMessageFailToUserWhoAreNotInContacts() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $message = [
            'content' => 'Hello World!',
            'receiver_id' => $user2->id
        ];
        
        Sanctum::actingAs($user1);
        $this->post('/api/messages/', $message, [
            'accept' => 'application/json',
            'content' => 'application/json'
        ])->assertStatus(405)->assertJson([
            'message' => 'User is not exist in contacts'
        ]);

        $this->assertEmpty(Message::where('sender_id', $user1->id)->first());
    }

    public function testSendMessageFailIfMessageIsEmpty() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // make sure user1 & user2 message is empty
        $this->assertEmpty(Message::where('sender_id', $user1->id)->first());

        // add to contacts
        Contact::create([
        'user_id' => $user2->id,
        'added_by' => $user1->id
         ]);
        Contact::create([
        'user_id' => $user1->id,
        'added_by' => $user2->id
        ]);

        $message = [
            'content' => '',
            'receiver_id' => $user2->id
        ];
        
        Sanctum::actingAs($user1);
        $this->post('/api/messages/', $message, [
            'accept' => 'application/json',
            'content' => 'application/json'
        ])->assertStatus(403);

        $this->assertEmpty(Message::where('sender_id', $user1->id)->first());
    }
}
