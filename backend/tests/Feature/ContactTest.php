<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function testGetContacts() {
        Sanctum::actingAs(User::where('name', 'Arza')->first());

        $this->get('/api/contacts')->assertStatus(200);
    }

    public function testGetContactsFailsIfNotAuthenticated() {
        $this->get('/api/contacts', [
            'accept' => 'application/json'
        ])->assertStatus(401);
    }
}
