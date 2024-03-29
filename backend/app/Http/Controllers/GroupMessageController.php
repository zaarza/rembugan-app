<?php

namespace App\Http\Controllers;

use App\Events\GroupMessageSent;
use App\Http\Requests\GroupMessagePostRequest;
use App\Http\Resources\GroupMessageResource;
use App\Models\Group;
use App\Models\GroupMember;
use App\Models\GroupMessage;
use App\Models\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class GroupMessageController extends Controller
{
    /**
    * Display a listing resource
    */
    public function get(Request $request, string $groupId = null)
    {
        // TODO: Return all group message if group id not given
        if (!$groupId) {
            $groups = Auth::user()->groups;
            $result = collect();
            $messages = DB::table('group_messages')->whereIn('group_id', $groups->pluck('id'))->get();
            
            // Group by group_id
            $messages->each(function ($message) use ($result) {
                if (!$result->has($message->group_id)) {
                    $result[$message->group_id] = DB::table('group_messages')->where('group_id', $message->group_id)->latest('sent_at')->paginate(5);
                }
            });
            return response()->json([
                'status' => 200,
                'data' => $result,
                'message' => "Get all group messages success"
            ], 200);
        };
      
        // TODO: Throw 404 error, if group id is given but group id is invalid or user not joined related group
        $isJoined = GroupMember::where([
            'user_id' => $request->user()->id,
            'group_id' => $groupId
        ])->firstOr(fn() => false);
        $group = Group::find($groupId);

        if (!$group || !$isJoined) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'Group not found'
            ], 404));
        }

        // TODO: Return related group messages
        return response()->json([
            'status' => 200,
            'data' => $group->messages,
            'message' => 'Get group messages success'
        ], 200);
    }

    /**
     * Post new group message
     */
    public function post(GroupMessagePostRequest $request, string $groupId = null): JsonResponse
    {
        $group = Group::find($groupId);
        $isMember = GroupMember::where([
            'user_id' => $request->user()->id,
            'group_id' => $groupId    
        ]);

        // * Group id invalid or User is not a member of related group
        if ($group === null || $isMember === null) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => "Group not found!"
            ], 404));
        }

        // TODO: Create message
        $data = $request->validated();
        DB::beginTransaction();

        try {
            $newMessage = GroupMessage::create([
                'group_id' => $groupId,
                'sender_id' => $request->user()->id,
                'content' => $data['message'],
            ]);

            DB::commit();

            broadcast(new GroupMessageSent($groupId, $newMessage->getAttributes()))->toOthers();
            return response()->json([
                'status' => 201,
                'data' => $newMessage,
                'message' => "Send group message success"
            ], 201);
        } catch (Exception $exception) {
            DB::rollBack();

            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage(),
            ], 500));
        }
    }
}
