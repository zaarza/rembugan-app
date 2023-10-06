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
    use RefreshDatabase;
    
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

    public function testGetAllMessage() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        Message::create([
            'content' => "Message from $user2->name",
            'receiver_id' => $user1->id,
            'sender_id' => $user2->id
        ]);

        sleep(1);

        Message::create([
            'content' => "Message from $user2->name 2",
            'receiver_id' => $user1->id,
            'sender_id' => $user2->id
        ]);

        Message::create([
            'content' => "Message from $user3->name",
            'receiver_id' => $user1->id,
            'sender_id' => $user3->id
        ]);

        Sanctum::actingAs($user1);
        $this->get('/api/messages', ['accept' => 'application/json'])
            ->assertJson([
                'status' => 200,
                'data' => [
                    $user2->id => [
                        'unreaded' => 2,
                        'pagination' => [
                            'data' => [
                                ['content' => "Message from $user2->name 2"]
                            ]
                        ]
                    ],
                    $user3->id => [
                        'unreaded' => 1,
                        'pagination' => [
                            'data' => [
                                ['content' => "Message from $user3->name"]
                            ]
                        ]
                    ]
                ]
            ]);
    }

    public function testGetAllMessageById() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        Message::create([
            'content' => "Message from $user2->name",
            'receiver_id' => $user1->id,
            'sender_id' => $user2->id
        ]);

        sleep(1);

        Message::create([
            'content' => "Message from $user2->name 2",
            'receiver_id' => $user1->id,
            'sender_id' => $user2->id
        ]);

        Sanctum::actingAs($user1);
        $this->get('/api/messages/'. $user2->id, ['accept' => 'application/json'])
            ->assertJson([
                'status' => 200,
                'data' => [
                    $user2->id => [
                        'unreaded' => 2,
                        'pagination' => [
                            'data' => [
                                ['content' => "Message from $user2->name 2"]
                            ]
                        ]
                    ],
                ]
            ]);
    }
}
