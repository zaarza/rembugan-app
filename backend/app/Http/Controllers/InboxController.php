<?php

namespace App\Http\Controllers;

use App\Http\Requests\InboxPostRequest;
use App\Models\Group;
use App\Models\Inbox;
use App\Models\User;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class InboxController extends Controller
{
    // Get current user inbox //
    public function get(Request $request): JsonResponse {
        // params: show = seen | unseen
        $result = Inbox::where('receiver_id', $request->user()->id)
            ->when($request->show, function ($query, string $showQuery) {
                $showQuery === 'seen' ?  $query->where('is_seen', 1)->latest() : $query->where('is_seen', 0)->latest();
            }, function ($query) {
                $query->latest();
            })->paginate(5);

        return response()->json([
            'status' => 200,
            'data' => $result,
            'message' => 'Get inbox success'
        ], 200);
    }


    /**
     * Create new inbox notification
     */
    public function post(InboxPostRequest $request): JsonResponse {
        $data = $request->validated();

        // TODO: Check whether the receiver ID matches the data in the user or group model
        $isReceiverIdValidInUserModel = User::findOr($data['receiver_id'], fn () => false);
        $isReceiverIdValidInGroupModel = Group::findOr($data['receiver_id'], fn () => false);

        if (!$isReceiverIdValidInUserModel && !$isReceiverIdValidInGroupModel) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'Receiver id not found!'
            ], 404));
        };

        // * If inbox already exist
        $isExist = Inbox::where([
            ...$data,
            'sender_id' => $request->user()->id,
        ])->first();

        if ($isExist) {
            return response()->json([
                'status' => 200,
                'data' => $isExist,
                'message' => 'Inbox already exist'
            ], 200);
        }

        $inboxToStore = [
            ...$data,
            'sender_id' => $request->user()->id,
        ];
        
        $inbox = Inbox::create($inboxToStore);

        return response()->json([
            'status' => 201,
            'data' => $inbox,
            'message' => 'Post inbox success'
        ], 201);
    }

    public function markSeen(Request $request, string $inboxId): JsonResponse {
        // if inbox id invalid or inbox doesn't exist in current user inbox
        if (!$inbox = Inbox::where([
            'id' => $inboxId,
            'receiver_id' => $request->user()->id,
        ])->first()) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'Inbox not found'
            ], 404));
        };

        $inbox->is_seen = true;
        $inbox->save();

        return response()->json([
            'status' => 200,
            'data' => $inbox,
            'message' => 'Mark inbox seen success'
        ], 200);
    }
}
