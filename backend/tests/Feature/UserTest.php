<?php

namespace Tests\Feature;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    // Reset database after test
    use RefreshDatabase;

    public function testRegisterSuccess()
    {
        $this->post('/api/users', [
            'name' => 'Arza',
            'email' => 'arza@email.com',
            'password' => '12345678'
        ])->assertStatus(201)->assertJson([
            'status' => 201,
            'data' => [
                'name' => 'Arza',
                'email' => 'arza@email.com',
            ],
            'message' => 'Register success',
        ]);

        $this->assertDatabaseHas('users', [
            'name' => 'Arza'
        ]);
    }

    public function testRegisterFailIfEmailIsRegistered()
    {
        $this->post('/api/users', [
            'name' => 'Arza',
            'email' => 'arza@email.com',
            'password' => '12345678'
        ])->assertStatus(201)->assertJson([
            'status' => 201,
            'data' => [
                'name' => 'Arza',
                'email' => 'arza@email.com',
            ],
            'message' => 'Register success',
        ]);

        $this->post('/api/users', [
            'name' => 'Arza',
            'email' => 'arza@email.com',
            'password' => '12345678'
        ])->assertStatus(403);
    }

    public function testRegisterFailIfPasswordLengthIsSmallerThan_8()
    {
        $this->post('/api/users', [
            'name' => 'Arza',
            'email' => 'arza@email.com',
            'password' => '1234567'
        ])->assertStatus(403)->assertExactJson([
            'status' => 403,
            'data' => [
                'password' => ['The password field must be at least 8 characters.']
            ],
            'message' => "Register failed, credentials, doesn't meet the requirements",
        ]);
    }

    public function testGetCsrfCookie()
    {
        $this->get('/sanctum/csrf-cookie')->assertCookie("XSRF-TOKEN");
    }

    public function testLoginUser()
    {
        $user = User::factory()->create();
        $token = $this->get('/sanctum/csrf-cookie')->getCookie('XSRF-TOKEN')->getValue();
        
        $this->post('/api/users/login', [
            'email' => $user->email,
            'password' => 'password',
        ], [
            'accept' => 'application/json',
            'X-XSRF-TOKEN' => $token
        ])->assertStatus(200);
    }

    public function testGetUserDetailsSuccess()
    {
        $user = User::factory()->create();

        $this->get('/api/users/' . $user->id)->assertStatus(200)->assertJson([
            'status' => 200,
            'data' => [
                'id' => $user->id,
                'name' => $user->name
            ],
            'message' => 'Get user detail success'
        ]);
    }

    public function testGetUserDetailsNotFound()
    {
        $this->get('/api/users/random')->assertStatus(404)->assertJson([
            'status' => 404,
            'data' => null,
            'message' => 'User not found'
        ]);
    }

    public function testUpdateUserDetails() {
        Storage::fake();
        
        $user = User::factory()->create();
        $response = $this->post('/api/users/' . $user->id, [
            'name' => 'name updated',
            'email' => 'email@updated.com',
            'avatar' => UploadedFile::fake()->image('fake.png')
        ]);
        
        $response->assertStatus(200);
        $response->assertJson([
            'status' => 200,
            'data' => [
                'name' => 'name updated',
                'email' => 'email@updated.com',
            ]
        ]);

        // check user avatar updated
        $user = User::where('id', $user->id)->first();
        $this->assertNotNull($user->avatar);
        
        // avatar stored to disk
        $this->assertNotEmpty(Storage::allFiles('public/users/avatar'));

        // delete old avatar if exist
        $this->post('/api/users/'. $user->id, [
            'avatar' => UploadedFile::fake()->image('fake.png')
        ]);
        $this->assertCount(1, Storage::allFiles('public/users/avatar'));
        
        $user->delete();
    }
}
