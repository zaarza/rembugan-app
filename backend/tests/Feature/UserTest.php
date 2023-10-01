<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic feature test example.
     */
    // public function test_example(): void
    // {
    //     $response = $this->get('/');

    //     $response->assertStatus(200);
    // }

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
}
