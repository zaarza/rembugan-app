<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\Group;
use App\Models\GroupMember;
use App\Models\GroupMessage;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

use function PHPSTORM_META\map;

class GroupTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateANewGroup() {
        $user = User::factory()->create();
        $this->assertEmpty($user->groups);
        Storage::fake();
        
        Sanctum::actingAs($user);

        $response = $this->post('/api/groups', [
            'name' => 'Random Group Name',
            'description' => 'Lorem ipsum dolor sit amet',
            'avatar' => UploadedFile::fake()->image('fake.png'),
        ], [
            'accept' => 'application/json'
        ]);
        
        $response->assertStatus(201);

        $this->assertNotEmpty(User::where('id', $user->id)->first()->groups);

        $this->assertNotEmpty(Group::where([
            'created_by' => $user->id,
            'name' => 'Random Group Name',
            'description' => 'Lorem ipsum dolor sit amet',
        ])->first());

        $this->assertNotEmpty(GroupMember::where([
            'user_id' => $user->id,
            'group_id' => $response->decodeResponseJson()['data']['id'],
            'is_admin' => 1
        ])->first());

        $this->assertNotEmpty(User::where('id', $user->id)->first()->groups);
        $this->assertCount(1, Storage::allFiles('public/groups/avatar'));
    }

    public function testCreateANewGroupValidation() {
        $user = User::factory()->create();
        $this->assertEmpty($user->groups);
        
        Sanctum::actingAs($user);
        $this->post('/api/groups', [
            'name' => '',
            'description' => 'Lorem ipsum dolor sit amet',
            'avatar' => '',
        ], [
            'accept' => 'application/json'
        ])
            ->assertStatus(403)
            ->assertJson([
                'data' => [
                    'name' => ['The name field is required.']
                ]
            ]);

        $this->assertEmpty(User::where('id', $user->id)->first()->groups);
    }

    public function test_get_group_details_with_valid_group_id() {
        $user = User::factory()->create();

        $group = Group::create([
            'name' => 'random',
            'created_by' => $user->id
        ]);

        Sanctum::actingAs($user);
        $response = $this->get('/api/groups/' . $group->id, [
            'accept' => 'application/json'
        ]);
        
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'name' => $group->name,
                'created_by' => $user->id
            ]
        ]);
    }

    public function test_get_group_details_with_invalid_group_id() {
        $user = User::factory()->create();

        Group::create([
            'name' => 'random',
            'created_by' => $user->id
        ]);

        Sanctum::actingAs($user);
        $response = $this->get('/api/groups/' . uniqid(), [
            'accept' => 'application/json'
        ]);

        $response->assertStatus(404);
        $response->assertJson([
            'data' => null
        ]);
    }

    public function test_get_group_details_without_group_id() {
        $user = User::factory()->create();

        $group1 = Group::create([
            'name' => 'random',
            'created_by' => $user->id
        ]);

        $group2 = Group::create([
            'name' => 'random 2',
            'created_by' => $user->id
        ]);

        GroupMember::create([
            'user_id' => $user->id,
            'group_id' => $group1->id
        ]);

        GroupMember::create([
            'user_id' => $user->id,
            'group_id' => $group2->id
        ]);

        Sanctum::actingAs($user);
        $response = $this->get('/api/groups/', [
            'accept' => 'application/json'
        ]);
        
        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                [
                    'name' => $group1->name,
                ],
                [
                    'name' => $group2->name
                ]
            ]
        ]);
    }

    public function test_leave_group_with_valid_group_id() {
        $users = User::factory(3)->create();
        $group = Group::factory()->create([ 'created_by' => $users[0]->id ]);

        $members = $users->map(function ($user, $index) use ($group) {
            return GroupMember::create([
                'group_id' => $group->id,
                'user_id' => $user->id,
                'is_admin' => $index === 0 ? true : false
            ]);
        });

        Sanctum::actingAs($users[0]);
        $response = $this->delete('/api/groups/' . $group->id . '/leave',
            [],
            ['accept' => 'application/json']
        );

        $response->assertStatus(200);

        $this->assertDatabaseMissing(GroupMember::class, collect($members[0])->only(['group_id', 'user_id'])->toArray());
        $this->assertTrue(GroupMember::find($members[1]->id)->is_admin === 1);

        $members[1]->delete();
        Sanctum::actingAs($users[2]);
        $response2 = $this->delete('/api/groups/' . $group->id . '/leave',
            [],
            ['accept' => 'application/json']
        );

        $response2->assertStatus(200);
        $this->assertDatabaseMissing(GroupMember::class, collect($members[2])->only(['user_id', 'group_id'])->toArray());   
    }

    public function test_leave_group_with_invalid_group_id() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->delete('/api/groups/' . uniqid() . '/leave',
            [],
            ['accept' => 'application/json']
        );

        $response->assertStatus(404);
    }

    public function test_leave_group_when_user_not_joined_related_group() {
        $user = User::factory()->create();

        $group = Group::create([
            'name' => 'random',
            'created_by' => uniqid()
        ]);
        $member = GroupMember::create([
            'user_id' => uniqid(),
            'group_id' => $group->id,
            'is_admin' => 1
        ]);

        Sanctum::actingAs($user);
        $response = $this->delete('/api/groups/' . $group->id . '/leave',
            [],
            ['accept' => 'application/json']
        );

        $response->assertStatus(404);
    }

    public function test_update_group_details_with_valid_group_id() {
        Storage::fake();
        $user = User::factory()->create();
        $group = Group::factory()->create([ 'created_by' => $user->id ]);
        $groupMember = GroupMember::create([
            'group_id' => $group->id,
            'user_id' => $user->id,
            'is_admin' => true
        ]);

        Sanctum::actingAs($user);
        $response1 = $this->post('/api/groups/' . $group->id, 
            [
                'name' => 'updated',
                'description' => 'updated',
                'avatar' => UploadedFile::fake()->image('fake.png'),
            ],
            ['accept' => 'application/json']
        );

        $response1->assertStatus(200);
        $response1->assertJson([
            'data' => [
                'name' => 'updated',
                'description' => 'updated',
            ]
        ]);

        // Avatar updated
        $this->assertNotNull($group->refresh()->avatar);
        // Avatar stored into disk
        $this->assertNotEmpty(Storage::allFiles('/public/groups/avatar'));

        $response2 = $this->post('/api/groups/' . $group->id,
            [
                'name' => 'updated 2',
                'description' => 'updated 2',
                'avatar' => UploadedFile::fake()->image('fake2.png'),
            ],
            ['accept' => 'application/json']
        );

        $response2->assertStatus(200);
        $response2->assertJson([
            'data' => [
                'name' => 'updated 2',
                'description' => 'updated 2'
            ]
        ]);

        // Avatar updated
        $this->assertNotSame($response1->decodeResponseJson()['data']['avatar'], $response2->decodeResponseJson()['data']['avatar']);

        // Old avatar file deleted
        $this->assertCount(1, Storage::allFiles('/public/groups/avatar'));
    }

    public function test_update_group_details_with_non_admin_user() {
        $users = User::factory(2)->create();
        $group = Group::factory()->create([ 'created_by' => $users[0]->id ]);
        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => $users[0]->id,
            'is_admin' => true
        ]);

        Sanctum::actingAs($users[1]);
        $response = $this->post('/api/groups/' . $group->id,
            [
                'name' => 'updated'
            ],
            ['accept' => 'application/json']
        );

        $response->assertStatus(404);
    }

    public function test_update_group_details_with_invalid_group_id() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->post('/api/groups/' . uniqid(),
            [
                'name' => 'updated'
            ],
            ['accept' => 'application/json']
        );

        $response->assertStatus(404);
    }

    public function test_get_group_message() {
        $user = User::factory()->create();
        $groups = Group::factory(2)->create([
            'created_by' => $user->id
        ]);
        $group1Member = GroupMember::create([
            'group_id' => $groups[0]->id,
            'user_id' => $user->id,
            'is_admin' => true
        ]);
        $group2Member = GroupMember::create([
            'group_id' => $groups[1]->id,
            'user_id' => $user->id,
            'is_admin' => true
        ]);
        $group1Messages = GroupMessage::factory(10)->create([
            'group_id' => $groups[0]->id,
            'sender_id' => $user->id
        ]);
        $group2Messages = GroupMessage::factory(2)->create([
            'group_id' => $groups[1]->id,
            'sender_id' => $user->id
        ]);
        
        // TODO: Get group messages without sending group id
        Sanctum::actingAs($user);
        $response1 = $this->get('/api/groupMessages/', [
            'accept' => 'application/json'
        ]);

        $response1->assertStatus(200);;
        $this->assertEquals(10, $response1->decodeResponseJson()['data'][$groups[0]->id]['total']);
        $this->assertEquals(2, $response1->decodeResponseJson()['data'][$groups[1]->id]['total']);

        // TODO: Get group messages with sending group id
        $response2 = $this->get('/api/groupMessages/' . $groups[0]->id, [
            'accept' => 'application/json'
        ]);

        $response2->assertStatus(200);
        $this->assertEquals(10, count($response2->decodeResponseJson()['data']));
    }

    public function test_get_group_message_with_invalid_group_id() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->get('/api/groups/' . uniqid(), [
            'accept' => 'application/json'
        ]);

        $response->assertStatus(404);
    }

    public function test_get_group_message_with_user_not_joined_that_group() {
        $users = User::factory(2)->create();
        $group = Group::factory()->create([
            'created_by' => $users[0]->id
        ]);

        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => $users[1]->id
        ]);

        Sanctum::actingAs($users[0]);
        $response = $this->get('/api/groups/' . uniqid(), [
            'accept' => 'application/json'
        ]);

        $response->assertStatus(404);
    }
    
    public function test_accept_group_join_request() {
        // TODO: Seeding
        $users = User::factory(2)->create();
        $group = Group::factory()->create([
            'created_by' => $users[0]
        ]);

        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => $users[0]->id,
            'is_admin' => true
        ]);
        

        $joinRequest = Inbox::create([
            'type' => 'group-join-request',
            'receiver_id' => $group->id,
            'content' => $group->id,
            'sender_id' => $users[1]->id
        ]);

        // TODO: Get response
        Sanctum::actingAs($users[0]);
        $response = $this->post('/api/groups/' . $group->id . '/accept', 
            [
                'inbox_id' => $joinRequest->id,
                'sender_id' => $users[1]->id
            ],
            ['accept' => 'application/json']
        );

        // TODO: Asserting
        $response->assertStatus(201);

        // User added to group
        $this->assertDatabaseHas('group_members', [
            'user_id' => $users[1]->id,
            'group_id' => $group->id,
        ]);
        // Inbox request deleted
        $this->assertDatabaseMissing('inboxes', $joinRequest->toArray());
    }

    public function test_reject_group_join_request() {
        // TODO: Seeding
        $users = User::factory(2)->create();
        $group = Group::factory()->create([
            'created_by' => $users[0]
        ]);

        GroupMember::create([
            'group_id' => $group->id,
            'user_id' => $users[0]->id,
            'is_admin' => true
        ]);

        $joinRequest = Inbox::create([
            'type' => 'group-join-request',
            'receiver_id' => $group->id,
            'content' => $group->id,
            'sender_id' => $users[1]->id
        ]);

        // TODO: Get response
        Sanctum::actingAs($users[0]);
        $response = $this->post('/api/groups/' . $group->id . '/reject', 
            [
                'inbox_id' => $joinRequest->id,
                'sender_id' => $users[1]->id
            ],
            ['accept' => 'application/json']
        );

        // TODO: Asserting
        $response->assertStatus(200);

        // User not added to group
        $this->assertDatabaseMissing('group_members', [
            'user_id' => $users[1]->id,
            'group_id' => $group->id,
        ]);
        // Inbox request deleted
        $this->assertDatabaseMissing('inboxes', $joinRequest->toArray());
    }

    public function test_post_group_message()
    {
        $user = User::factory()->create();
        $group = Group::create([
            'created_by' => $user->id,
            'name' => 'Random',
        ]);

        GroupMember::create([
            'user_id' => $user->id,
            'group_id' => $group->id,
            'is_admin' => 1,
        ]);

        Sanctum::actingAs($user);
        $response = $this->post('/api/groupMessages/' . $group->id, [
            'message' => "Hello world",
        ], [
            'accept' => 'application/json',
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('group_messages', [
            'content' => "Hello world",
            'group_id' => $group->id,
            'sender_id' => $user->id,
        ]);
    }

    public function test_invite_contacts_into_a_group() {
        $users = User::factory(3)->create();

        for ($i = 1; $i < 3; $i++) {
            Contact::create([
                'added_by' => $users[0]->id,
                'user_id' => $users[$i]->id    
            ]);

            Contact::create([
                'user_id' => $users[0]->id,
                'added_by' => $users[$i]->id    
            ]);
        }

        $group = Group::factory()->create([
            'created_by' => $users[0]->id
        ]);
        $groupMember = GroupMember::create([
           'group_id' => $group->id,
           'user_id' => $users[0]->id,
           'is_admin' => 1,
        ]);

        Sanctum::actingAs($users[0]);
        $response = $this->post('/api/groups/' . $group->id . '/invite', [
            'users_id' => [$users[1]->id, $users[2]->id],
        ], [
            'accept' => 'application/json'
        ]);

        $response->assertStatus(201);
        $this->assertDatabaseHas('inboxes', [
            'type' => 'group',
            'receiver_id' => $users[1]->id,
            'sender_id' => $group->id    
        ]);
        $this->assertDatabaseHas('inboxes', [
            'type' => 'group',
            'receiver_id' => $users[2]->id,
            'sender_id' => $group->id    
        ]);
    }
}
