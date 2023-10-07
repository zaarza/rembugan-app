<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Contact;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user1 = User::create([
            'name' => 'Arza',
            'email' => 'arza@email.com',
            'password' => '12345678'
        ]);

        $user2 = User::create([
            'name' => 'Samsudin',
            'email' => 'samsudin@email.com',
            'password' => '12345678'
        ]);

        $user3 = user::create([
            'name' => 'Januar',
            'email' => 'januar@email.com',
            'password' => '12345678'
        ]);

        Contact::create([
            'user_id' => $user2->id,
            'added_by' => $user1->id
        ]);

        Contact::create([
            'user_id' => $user1->id,
            'added_by' => $user2->id
        ]);

        Inbox::create([
            'receiver_id' => $user1->id,
            'sender_id' => $user3->id,
            'type' => 'friend',
            'content' => $user3->id,
        ]);
    }
}
