<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\ConversationChat;
use App\Models\ConversationParticipant;
use App\Models\Inbox;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // * USER
        $user1 = User::create([
            'id' => 'alpha',
            'name' => 'Alpha',
            'email' => 'alpha@email.com',
            'password' => '12345678'
        ]);

        $user2 = User::create([
            'id' => 'beta',
            'name' => 'Beta',
            'email' => 'beta@email.com',
            'password' => '12345678'
        ]);

        // * ADD USER 1 & 2 TO CONTACTS
        Contact::create([
            'added_by' => $user1->id,
            'user_id' => $user2->id,    
        ]);
        Contact::create([
            'user_id' => $user1->id,
            'added_by' => $user2->id,    
        ]);

        $conversation = Conversation::create();

        ConversationParticipant::create([
            'conversation_id' => $conversation->id,
            'user_id' => $user1->id
        ]);
        ConversationParticipant::create([
            'conversation_id' => $conversation->id,
            'user_id' => $user2->id
        ]);

        ConversationChat::factory(3)->create([
            'sender_id' => $user1->id,
            'conversation_id' => $conversation->id
        ]);
        ConversationChat::factory(2)->create([
            'sender_id' => $user2->id,
            'conversation_id' => $conversation->id
        ]);
    }
}
