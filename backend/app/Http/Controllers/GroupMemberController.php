<?php

namespace App\Http\Controllers;

use App\Models\Group;
use App\Models\GroupMember;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class GroupMemberController extends Controller
{
    public function kick(string $groupId, string $userId, Request $request): JsonResponse {
        // Check is group id & member id valid
        $group = Group::find($groupId);
        $member = GroupMember::where([
            'group_id' => $groupId,
            'user_id' => $userId,
        ])->first();
   
        if ($group === null || $member === null) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => "Group / Member not found",
            ], 404));
        };

        // Check is current user is an admin
        $isAdmin = GroupMember::where([
            'user_id' => $request->user()->id,
            'group_id' => $groupId,
            'is_admin' => 1,
        ])->first();

        if ($isAdmin === null) {
            throw new HttpResponseException(response()->json([
                'status' => 401,
                'data' => null,
                'message' => "Only an admin can do this action"
            ], 401));
        }

        try {
            $member->delete();
            return response()->json([
                'status' => 200,
                'data' => null,
                'message' => "Remove member from group success",
            ], 200);
        } catch (Exception $exception) {
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage(),
            ], 500));
        }
    }

    public function setAdmin(Request $request, string $groupId, string $userId): JsonResponse {
        // Check is group id & member id valid
        $group = Group::find($groupId);
        $member = GroupMember::where([
            'group_id' => $groupId,
            'user_id' => $userId,
        ])->first();
   
        if ($group === null || $member === null) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => "Group / Member not found",
            ], 404));
        };

        // Check is current user is an admin
        $isAdmin = GroupMember::where([
            'user_id' => $request->user()->id,
            'group_id' => $groupId,
            'is_admin' => 1,
        ])->first();

        if ($isAdmin === null) {
            throw new HttpResponseException(response()->json([
                'status' => 401,
                'data' => null,
                'message' => "Only an admin can do this action"
            ], 401));
        }

        try {
            $member->is_admin = 1;
            $member->save();

            return response()->json([
                'status' => 200,
                'data' => $member,
                'message' => "Update member is an admin success",
            ], 200);
        } catch (Exception $exception) {
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage(),
            ], 500));
        }
    }
}
