<?php

namespace Tests\Feature;

use App\Models\Inbox;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class InboxTest extends TestCase
{
    use RefreshDatabase;

    public function testGetAllInboxWithAndWithoutQueryParam() {
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        $user3 = User::factory()->create();

        $inbox1 = Inbox::create([
            'receiver_id' => $user1->id,
            'sender_id' => $user2->id,
            'type' => 'friend',
        ]);

        sleep(1);
        
        $inbox2 = Inbox::create([
            'receiver_id' => $user1->id,
            'sender_id' => $user3->id,
            'type' => 'friend',
        ]);

        $inbox2->save();
        
        Sanctum::actingAs($user1);
        $response = $this->get('/api/inbox', ['accept' => 'application/json']);
        $response->assertStatus(200);
        $response->assertJson(([
                'data' => [
                    'total' => '2',
                    'data' => [
                        [
                            'sender_id' => $user3->id
                        ],
                        [
                            'sender_id' => $user2->id
                        ]
                    ]
                ]
        ]));
    }

    public function testPostInbox() {
        $users = User::factory(2)->create();
        
        Sanctum::actingAs($users[1]);
        $response = $this->post('/api/inbox', [
            'type' => 'friend',
            'receiver_id' => $users[0]->id,
        ], [
            'accept' => 'application/json'
        ]);
        
        $response->assertStatus(201);

        $this->assertDatabaseHas('inboxes', [
            'type' => 'friend',
            'receiver_id' => $users[0]->id,
        ]);
    }

    public function testPostInboxFailIfReceiverIdIsInvalid() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->post('/api/inbox', [
            'type' => 'friend',
            'receiver_id' => uniqid(),
        ], [
            'accept' => 'application/json'
        ]);

        $response->assertStatus(404);
    }

    public function testPostInboxFailIfInboxTypeIsInvalid() {
        $users = User::factory(2)->create();

        Sanctum::actingAs($users[0]);
        $this->post('/api/inbox', [
            'type' => 'randomType',
            'receiver_id' => $users[1]->id,
        ], [
            'accept' => 'application/json'
        ])
            ->assertStatus(403)
            ->assertJson([
                'data' => [
                    'type' => ['The selected type is invalid.']
                ]
            ]);
    }
}
