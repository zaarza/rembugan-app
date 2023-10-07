<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class GroupTest extends TestCase
{
    use RefreshDatabase;

    public function testCreateANewGroup() {
        $user = User::factory()->create();
        $this->assertEmpty($user->groups);
        Storage::fake();
        
        Sanctum::actingAs($user);
        $this->post('/api/groups', [
            'name' => 'Random Group Name',
            'description' => 'Lorem ipsum dolor sit amet',
            'avatar' => UploadedFile::fake()->image('fake.png'),
        ], [
            'accept' => 'application/json'
        ])
            ->assertStatus(201);

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
}
