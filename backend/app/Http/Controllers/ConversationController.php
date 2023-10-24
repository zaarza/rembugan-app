<?php

namespace App\Http\Controllers;

use App\Events\PrivateMessageSent;
use App\Http\Requests\ConversationChatRequest;
use App\Models\Conversation;
use App\Models\ConversationChat;
use App\Models\ConversationParticipant;
use App\Models\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ConversationController extends Controller
{
    /**
     * Display a conversations that current user is a participant from related conversation.
     */
    public function get(Request $request): JsonResponse
    {
        $data = $request->user()->conversations->groupBy('id');
        
        return response()->json([
            'status' => 200,
            'data' => $data,
            'message' => 'Get conversations success'    
        ], 200);
    }

    /**
     * Store new chat into related conversation
     */
    public function post(ConversationChatRequest $request, string $conversationId = null)
    {
        $data = $request->validated();
        $conversation = null;

        if (!$conversationId) {
            $conversation = Conversation::create();
            
            ConversationParticipant::create([
                'user_id' => $request->user()->id,
                'conversation_id' => $conversation->id
            ]);
            ConversationParticipant::create([
                'user_id' => $data['receiver_id'],
                'conversation_id' => $conversation->id
            ]);
        } else {
            $conversation = Conversation::where('id', $conversationId)->first();

            // * Invalid conversation id
            if ($conversation === null) {
                throw new HttpResponseException(response()->json([
                    'status' => 404,
                    'data' => null,
                    'message' => 'Invalid conversation id'
                ], 404));
            }

            $isUserAParticipant = ConversationParticipant::where([
                'conversation_id' => $conversationId,
                'user_id' => $request->user()->id,
            ])->first();

            // * User is not a participant from related conversation
            if (!$isUserAParticipant) {
                throw new HttpResponseException(response()->json([
                    'status' => 403,
                    'data' => null,
                    'message' => 'Unauthorized'
                ], 403));
            }
        }

        // TODO: Create conversation chat
        DB::beginTransaction();
        try {
            $chat = ConversationChat::create([
                'message' => $data['message'],
                'sender_id' => $request->user()->id,
                'conversation_id' => $conversation->id,
            ]);

           $broadcastTarget = DB::table('conversation_participants')->whereNot(function ($query) use ($request) {
            $query->where('user_id', $request->user()->id);
            })->first();

            if ($broadcastTarget !== null) {
                broadcast(new PrivateMessageSent($broadcastTarget->user_id, array($chat)))->toOthers();
            }

            DB::commit();
            return response()->json([
                'status' => 201,
                'data' => $chat,
                'message' => "Post new chat success"
            ], 201);
        } catch (Exception $exception) {
            DB::rollBack();
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => $exception->getMessage(),
                'message' => "Post new chat failed"
            ], 500));
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Conversation $conversation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Conversation $conversation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Conversation $conversation)
    {
        //
    }
}
