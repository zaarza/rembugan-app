<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupNewRequest;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\Group;
use App\Models\GroupMember;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class GroupController extends Controller
{
  public function new(GroupNewRequest $request) {
    $data = $request->validated();

    if ($avatar = $request->file('avatar')) {
      $path = $avatar->storeAs('public/groups/avatar', uniqid() . '.' . $avatar->extension());
      $link = Storage::url($path);
      
      $data['avatar'] = $link;
    }

    DB::beginTransaction();
    try {
      $group = Group::create([
        ...$data,
        'created_by' => $request->user()->id,
      ]);

      GroupMember::create([
        'group_id' => $group->id,
        'user_id' => $request->user()->id,
        'is_admin' => true
      ]);

      return response()->json([
        'status' => 201,
        'data' => $group,
        'message' => "Create a new group success",
      ], 201);

      DB::commit();
    } catch (Exception $exception) {
      DB::rollBack();
    }
  }

  /** 
  * Get group details by groupId, If group id not given, current user groups will be retrieve.
  */
  public function get(Request $request, string $groupId = null): JsonResponse {
    // TODO: Return current user groups if groupId not given
    if (!$groupId) {
      return response()->json([
        'status' => 200,
        'data' => $request->user()->groups,
        'message' => 'Get current user groups success'
      ], 200);
    }

    // TODO: Throw 404 error if group not exist or groupId is invalid
    if (!$group = Group::where('id', $groupId)->first()) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'Group not found'
      ], 404));
    }

    // TODO: Group found, return related group
    return response()->json([
      'status' => 200,
      'data' => $group,
      'message' => 'Get group detail success'
    ], 200);
  }

  /**
  * Leave group by group id, random member will be selected as an admin if no one is an admin, destroy group if hasn't any member
  */
  public function leave(Request $request, string $groupId = null): JsonResponse {
    // TODO: Throw 404 error if: group id not given or group id invalid or user not joined that group
    $group = Group::where('id', $groupId)->first();
    $joined = GroupMember::where([
      'user_id' => $request->user()->id,
      'group_id' => $groupId,
    ])->first();

    if (!$groupId || !$group || !$joined) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'Group not found!'
      ], 404));
    }

    DB::beginTransaction();
    try {
      $joined->delete();
      
      $groupHasAdmin = GroupMember::where([
        'group_id' => $groupId,
        'is_admin' => true,
      ])->first();

      $groupHasRemainingMembers = GroupMember::where([
        'group_id' => $groupId,
      ])->oldest()->first();

      // TODO: Assign oldest member as an admin or destroy group if hasn't any members
      if (!$groupHasAdmin) {
        if ($groupHasRemainingMembers) {
          $groupHasRemainingMembers->is_admin = true;
          $groupHasRemainingMembers->save();
        } else {
            $group->delete();
        }
      }

      DB::commit();
      return response()->json([
        'status' => 200,
        'data' => null,
        'message' => 'Leave group success'
      ], 200);
    } catch (Exception $exception) {
      
      DB::rollBack();
      return response()->json([
        'status' => 500,
        'data' => null,
        'message' => $exception->getMessage(),
      ], 500);
    }
  }
}
