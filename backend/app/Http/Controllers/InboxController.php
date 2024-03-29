<?php

namespace App\Http\Controllers;

use App\Events\InboxSent;
use App\Http\Requests\InboxMarkSeenManyRequest;
use App\Http\Requests\InboxPostRequest;
use App\Models\Group;
use App\Models\Inbox;
use App\Models\User;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InboxController extends Controller
{
    /**
     * Get current user inbox
     */
    public function get(Request $request): JsonResponse {
        $result = Inbox::with('sender_details')
            ->where('receiver_id', $request->user()->id)
            ->latest()
            ->paginate(5);

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

        // User cant send to herself
        if ($data['receiver_id'] === $request->user()->id) {
            throw new HttpResponseException(response()->json([
                'status' => 403,
                'data' => null,
                'message' => 'Failed to post inbox, user cant sent to herself'    
            ], 403));
        }

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

        try {
        // * If inbox already exist
        $isExist = Inbox::where([
            ...$data,
            'sender_id' => $request->user()->id,
        ])->first();

        if ($isExist !== null) {
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
        broadcast(new InboxSent($data['receiver_id'], array(Inbox::with('sender_details')->find($inbox->id))))->toOthers();

        return response()->json([
            'status' => 201,
            'data' => $inbox,
            'message' => 'Post inbox success'
        ], 201);
        
        } catch (Exception $exception) {
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage(),
            ], 500));
        }
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

    public function markSeenMany(InboxMarkSeenManyRequest $request) {
        $data = $request->validated();

        $unseenInboxes = Inbox::where([
            'receiver_id' => $request->user()->id,
            'is_seen' => false,
        ])
            ->whereIn('id', $data['inboxes_id']);

        $unseenInboxes->get();
        $unseenInboxes->update(['is_seen' => 1]);

        return response()->json([
            'status' => 200,
            'data' => $unseenInboxes,
            'message' => 'Mark inboxes as seen success'
        ], 200);
    }
}
