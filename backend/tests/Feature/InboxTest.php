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
            'content' => $user2->id,
        ]);

        sleep(1);
        
        $inbox2 = Inbox::create([
            'receiver_id' => $user1->id,
            'sender_id' => $user3->id,
            'type' => 'friend',
            'content' => $user3->id,
        ]);

        $inbox2->is_seen = 1;
        $inbox2->save();
        
        Sanctum::actingAs($user1);

        // without param
        $this->get('/api/inbox', ['accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson(([
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
        
        // show = seen
        $this->get('/api/inbox?show=seen', ['accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson(([
                'data' => [
                    'total' => '1',
                    'data' => [
                        [
                            'id' => $inbox2->id,
                            'sender_id' => $user3->id
                        ],
                    ]
                ]
        ]));

        // show = unseen
        $this->get('/api/inbox?show=unseen', ['accept' => 'application/json'])
            ->assertStatus(200)
            ->assertJson(([
                'data' => [
                    'total' => '1',
                    'data' => [
                        [
                            'id' => $inbox1->id,
                            'sender_id' => $user2->id
                        ],
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
            'content' => $users[1]->id,
        ], [
            'accept' => 'application/json'
        ]);
        
        $response->assertStatus(201);

        $this->assertDatabaseHas('inboxes', [
            'type' => 'friend',
            'receiver_id' => $users[0]->id,
            'content' => $users[1]->id,
        ]);
    }

    public function testPostInboxFailIfReceiverIdIsInvalid() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->post('/api/inbox', [
            'type' => 'friend',
            'receiver_id' => uniqid(),
            'content' => $user->id,
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
            'content' => $users[0]->id,
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

    public function testMarkInboxSeen() {
        $user = User::factory()->create();

        $inbox = Inbox::create([
            'content' => 'randomContent',
            'receiver_id' => $user->id,
            'sender_id' => 'randomId'
        ]);

        $this->assertEquals(Inbox::where('id', $inbox->id)->first()->is_seen, 0);

        Sanctum::actingAs($user);
        $this->post('/api/inbox/' . $inbox->id . '/markSeen', [], ['accept' => 'application/json'])
            ->assertStatus(200);

        $this->assertEquals(Inbox::where('id', $inbox->id)->first()->is_seen, 1);
    }

    public function testMarkInboxFailIfInboxIdInvalid() {
        $user = User::factory()->create();

        Inbox::create([
            'content' => 'randomContent',
            'receiver_id' => $user->id,
            'sender_id' => 'randomId'
        ]);

        Sanctum::actingAs($user);
        $this->post('/api/inbox/randoInboxId/markSeen', [], ['accept' => 'application/json'])
            ->assertStatus(404);
    }


    public function testMarkInboxFailIfInboxNotExistInUserInbox() {
        $users = User::factory(3)->create();

        $inbox = Inbox::create([
            'content' => 'randomContent',
            'receiver_id' => $users[2]->id,
            'sender_id' => 'randomId'
        ]);

        Sanctum::actingAs($users[0]);
        $this->post('/api/inbox/'. $inbox->id  .'/markSeen', [], ['accept' => 'application/json'])
            ->assertStatus(404);
    }

    public function test_mark_seen_many() {
        $user = User::factory()->create();

        $inbox1 = Inbox::create([
           'type' => 'friend',
           'sender_id' => 1,
           'receiver_id' => $user->id,
           'content' => 1
        ]);
        
        $inbox2 = Inbox::create([
           'type' => 'friend',
           'sender_id' => 2,
           'receiver_id' => $user->id,
           'content' => 2
        ]);

        Sanctum::actingAs($user);
        $response = $this->post('/api/inbox/markSeenMany', [
            'inboxes_id' => [$inbox1->id, $inbox2->id]    
        ],
            ['accept' => 'application/json']
        );

        $response->assertStatus(200);
        $this->assertEquals(1, $inbox1->fresh()->is_seen);
        $this->assertEquals(1, $inbox2->fresh()->is_seen);
    }
}
