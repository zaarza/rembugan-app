<?php

namespace Tests\Unit;

use App\Models\Conversation;
use App\Models\ConversationChat;
use App\Models\ConversationParticipant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Sanctum\Sanctum;
use Tests\TestCase;

class ConversationTest extends TestCase
{
    use RefreshDatabase;

    /**
     * Get user conversations
     */
    public function test_get_user_conversations(): void
    {
        $user1 = User::factory()->create([
            'id' => "user1"    
        ]);
        $user2 = User::factory()->create([
            'id' => "user2"    
        ]);

        $conversations = Conversation::factory(2)->create();

        $user1JoinConversation = ConversationParticipant::create([
            'user_id' => $user1->id,
            'conversation_id' => $conversations[0]->id    
        ]);

        $user1JoinConversation2 = ConversationParticipant::create([
            'user_id' => $user1->id,
            'conversation_id' => $conversations[1]->id    
        ]);

        $user2JoinConversation1 = ConversationParticipant::create([
            'user_id' => $user2->id,
            'conversation_id' => $conversations[1]->id    
        ]);

        ConversationChat::factory(3)->create([
            'sender_id' => $user1->id,
            'conversation_id' => $conversations[0]->id
        ]);

        ConversationChat::factory(3)->create([
            'sender_id' => $user1->id,
            'conversation_id' => $conversations[1]->id
        ]);

        Sanctum::actingAs($user1);
        $response = $this->get('/api/conversations', ['accept' => 'application/json']);
        $response->assertStatus(200);
    }

    public function test_post_chat_into_existing_conversation(): void
    {
        $user1 = User::factory()->create([
            'id' => "user1"    
        ]);
        $user2 = User::factory()->create([
            'id' => "user2"    
        ]);

        $conversation = Conversation::factory()->create();
        ConversationParticipant::create([
            'user_id' => $user1->id,
            'conversation_id' => $conversation->id    
        ]);

        ConversationParticipant::create([
            'user_id' => $user2->id,
            'conversation_id' => $conversation->id    
        ]);

        Sanctum::actingAs($user1);
        $response = $this->post('/api/conversations/' . $conversation->id, [
            'message' => "Hello!"    
        ], ['accept' => 'application/json']);

        $response->assertStatus(201);
        $this->assertDatabaseHas('conversation_chats', [
            'conversation_id' => $conversation->id,
            'sender_id' => $user1->id,
            'message' => "Hello!"
        ]);
    }

     public function test_post_chat_into_new_conversation(): void
    {
        $user1 = User::factory()->create([
            'id' => "user1"    
        ]);
        $user2 = User::factory()->create([
            'id' => "user2"    
        ]);

        Sanctum::actingAs($user1);
        $response = $this->post('/api/conversations/', [
            'message' => "Hello!",
            'receiver_id' => $user2->id
        ], ['accept' => 'application/json']);

        $response->assertStatus(201);
        $this->assertDatabaseHas('conversation_chats', [
            'conversation_id' => $response->decodeResponseJson()['data']['conversation_id'],
            'sender_id' => $user1->id,
            'message' => "Hello!"
        ]);
        $this->assertDatabaseHas('conversation_participants', [
            'conversation_id' => $response->decodeResponseJson()['data']['conversation_id'],
            'user_id' => $user1->id,
        ]);
        $this->assertDatabaseHas('conversation_participants', [
            'conversation_id' => $response->decodeResponseJson()['data']['conversation_id'],
            'user_id' => $user2->id,
        ]);
    }
}
