<?php

namespace Tests\Feature;

use App\Models\Contact;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\DB;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ContactTest extends TestCase
{
    public function testGetContacts() {
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
        $user->delete();
        $contactItem->delete();
    }

    public function testGetContactsFailsIfNotAuthenticated() {
        $this->get('/api/contacts', [
            'accept' => 'application/json'
        ])->assertStatus(401);
    }
}
