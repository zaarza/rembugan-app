<?php

namespace Tests\Feature;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class UserTest extends TestCase
{
    use RefreshDatabase;

    public function testRegisterSuccess()
    {
        DB::beginTransaction();
        $newUser = [
            'email' => uniqid().'@email.com',
            'name' => 'random',
            'password' => 'password'
        ];

        $this->post('/api/users', $newUser)->assertStatus(201)->assertJson([
            'status' => 201,
            'data' => [
                'name' => $newUser['name'],
            ],
        ]);

        $user = User::where('email', $newUser['email'])->first();
        $this->assertNotNull($user);
    }

    public function testRegisterValidation()
    {
        DB::beginTransaction();
        $user = User::factory()->create();

        $this->post('/api/users', [
            'name' => '',
            'email' => $user->email,
            'password' => ''
        ])->assertStatus(403)->assertJson([
            'status' => 403,
            'data' => [
                'name' => ['The name field is required.'],
                'email' => ['The email has already been taken.'],
                'password' => ['The password field is required.'],
            ],
            'message' => "Register failed, credentials, doesn't meet the requirements"
        ]);
    }

    public function testGetCsrfCookie()
    {
        $this->get('/sanctum/csrf-cookie')->assertCookie("XSRF-TOKEN");
    }

    public function testLoginUser()
    {
        DB::beginTransaction();
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
        DB::beginTransaction();
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
        DB::beginTransaction();
        Storage::fake();
        
        $user = User::factory()->create();
        Sanctum::actingAs($user);
        $this->post('/api/users/' . $user->id, [
            'name' => 'name updated',
            'email' => 'email@updated.com',
            'avatar' => UploadedFile::fake()->image('fake2.png')
        ])
            ->assertStatus(200)
            ->assertJson([
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
    }

    public function test_validate_cookie() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->get('/api/validate', ['accept' => 'application/json']);
        $response->assertStatus(200);
    }

    public function test_get_current_user_details() {
        $user = User::factory()->create();

        Sanctum::actingAs($user);
        $response = $this->get('/api/users/',
            ['accept' => 'application/json']
        );

        $response->assertStatus(200);
        $response->assertJson([
            'data' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email
            ]
        ]);
    }
}
