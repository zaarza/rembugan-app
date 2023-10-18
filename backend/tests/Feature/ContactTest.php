<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ContactTest extends TestCase
{
    use RefreshDatabase;
    
    public function testGetContacts() {
        DB::beginTransaction();
        $user = User::factory()->create();

        $this->assertEmpty($user->contacts);
        Sanctum::actingAs($user);

        $contactItem = Contact::create([
            'added_by' => $user->id,
            'user_id' => 'random'
        ]);
        
        $this->get('/api/contacts', [
            'accept' => 'application/json'
        ])->assertStatus(200);

        $this->assertNotEmpty(User::where('id', $user->id)->first()->contacts);
    }

    public function testGetContactsFailsIfNotAuthenticated() {
        $this->get('/api/contacts', [
            'accept' => 'application/json'
        ])->assertStatus(401);
    }

    public function testAddContact() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // make sure user1 & user2 contact is empty
        $this->assertEmpty(User::where('id', $user1->id)->first()->contacts);
        $this->assertEmpty(User::where('id', $user2->id)->first()->contacts);

        Sanctum::actingAs($user1);
        $this->post('/api/contacts/'. $user2->id, [], ['accept' => 'application/json'])->assertStatus(201);

        $this->assertNotEmpty($user1->contacts);
        $this->assertNotEmpty($user2->contacts);
    }

    public function testDuplicateContact() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        // make sure user1 & user2 contact is empty
        $this->assertEmpty(User::where('id', $user1->id)->first()->contacts);
        $this->assertEmpty(User::where('id', $user2->id)->first()->contacts);

        Sanctum::actingAs($user1);
        $this->post('/api/contacts/'. $user2->id, [], ['accept' => 'application/json'])->assertStatus(201);

        $this->assertCount(1, $user1->contacts);
        $this->assertCount(1, $user2->contacts);

        $this->post('/api/contacts/'.  $user2->id, [], ['accept' => 'application/json'])->assertStatus(201);
        $this->assertCount(1, $user1->contacts);
        $this->assertCount(1, $user2->contacts);
    }

    public function testAddContactFailIfNoUserWithGivenId() {
        DB::beginTransaction();
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $this->post('/api/contacts/' . uniqid(), [], ['accept' => 'application/json'])->assertStatus(404);
        $this->assertEmpty($user->contacts);
    }

    public function testDeleteContact() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();

        $this->assertEmpty($user1->contacts);

        Sanctum::actingAs($user1);
        $this->post('/api/contacts/' . $user2->id, [], ['accept' => 'application/json'])->assertStatus(201);
        $this->assertNotEmpty(Contact::where([
            'added_by' => $user1->id,
            'user_id' => $user2->id
        ])->first());

        $this->delete('api/contacts/'. $user2->id, [], ['accept' => 'application/json'])->assertStatus(200);
        $this->assertEmpty($user1->contacts);
    }

    public function testDeleteContactFailIfNoUserWithGivenId() {
        DB::beginTransaction();
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $this->delete('/api/contacts/'. uniqid(), [], ['accept' => 'application/json'])
            ->assertStatus(404)
            ->assertJson([
                'message' => 'User not found'
            ]);
    }

    public function testDeleteContactFailIfUserNotInContacts() {
        DB::beginTransaction();
        $user1 = User::factory()->create();
        $user2 = User::factory()->create();
        
        Sanctum::actingAs($user1);
        $this->delete('/api/contacts/' . $user2->id, [], ['accept' => 'application/json'])
            ->assertStatus(404)
            ->assertJson([
                'message' => 'User is not exist in contacts',
            ]);
    }

    public function test_accept_friend_request_with_valid_id() {
        // TODO: Seeding
        $users = User::factory(2)->create();
        $friendRequest = Inbox::create([
            'sender_id' => $users[1]->id,
            'receiver_id' => $users[0]->id,
            'type' => 'friend'
        ]);

        // TODO: Getting response
        Sanctum::actingAs($users[0]);
        $response = $this->post('/api/contacts/' . $users[1]->id . '/accept',
            [],
            ['accept' => 'application/json']
        );

        // TODO: Asserting
        $response->assertStatus(201);

        // Added to users[0] & users[1] contact
        $this->assertDatabaseHas('contacts',
            [
                'user_id' => $users[1]->id,
                'added_by' => $users[0]->id
            ]
        );

        $this->assertDatabaseHas('contacts',
            [
                'added_by' => $users[1]->id,
                'user_id' => $users[0]->id
            ]
        );

        // Inbox deleted from database
        $this->assertDatabaseMissing('inboxes',
            [
                'id' => $friendRequest->id,
                'sender_id' => $users[1]->id,
                'receiver_id' => $users[0]->id,
                'type' => 'friend'
            ]
        );
    }

    public function test_accept_friend_request_with_invalid_id() {
        // TODO: Seeding
        $user = User::factory()->create();

        // TODO: Getting response
        Sanctum::actingAs($user);
        $response = $this->post('/api/contacts/' . uniqid() . '/accept',
            [],
            ['accept' => 'application/json']
        );

        // TODO: Asserting
        $response->assertStatus(404);
    }
}
