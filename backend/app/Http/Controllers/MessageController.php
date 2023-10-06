<?php

namespace App\Http\Controllers;

use App\Http\Requests\MessagePostRequest;
use App\Models\Contact;
use App\Models\Message;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class MessageController extends Controller
{
  public function post(MessagePostRequest $request) {
    $data = $request->validated();

    // if user id invalid
    if (!User::where('id', $data['receiver_id'])->first()) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'User not found!'
      ], 404));
    }

    // if receiver id not in current user contact list
    if (!Contact::where([
      'added_by' => $request->user()->id,
      'user_id' => $data['receiver_id']
    ])->first()) {
      throw new HttpResponseException(response()->json([
        'status' => 405,
        'data' => null,
        'message' => 'User is not exist in contacts'
      ], 405));
    }

    $newMessage = Message::create([
      'content' => $data['content'],
      'sender_id' => $request->user()->id,
      'receiver_id' => $data['receiver_id'],
    ]);

    return response()->json([
      'status' => 201,
      'data' => $newMessage,
      'message' => 'Message send success'
    ], 201);
   }
 
  
  //  get initial current user message
  public function getInitialMessages(Request $request): JsonResponse {
    $result = null;

    // group by id, sort by latest
    foreach (collect($request->user()->messages)->sortBy('sent_at', 2, true) as $message) {
      // limit only 1/sender_id
      if (empty($result[$message->id])) {
        $result[$message['sender_id']] = [
          'unreaded' => count(Message::where([
            'is_readed' => false,
            'receiver_id' => $request->user()->id,
            'sender_id' => $message->sender_id,
          ])->get()),
          'data' => $message,
        ];
      }
    }

    return response()->json([
      'status' => 200,
      'data' => $result,
      'message' => 'Get all message success',
    ], 200);
  }
}