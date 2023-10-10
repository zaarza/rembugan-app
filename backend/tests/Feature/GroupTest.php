<?php

namespace Tests\Feature;

use App\Models\Group;
use App\Models\GroupMember;
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
}