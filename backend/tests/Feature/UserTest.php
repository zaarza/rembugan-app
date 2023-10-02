<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
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
}
