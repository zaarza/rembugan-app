<?php

namespace App\Http\Controllers;

use App\Events\InboxSent;
use App\Http\Requests\GroupAcceptJoinRequest;
use App\Http\Requests\GroupInviteRequest;
use App\Http\Requests\GroupNewRequest;
use App\Http\Requests\GroupUpdateRequest;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\Contact;
use App\Models\Group;
use App\Models\GroupMember;
use App\Models\Inbox;
use App\Models\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
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

      DB::commit();
      return response()->json([
        'status' => 201,
        'data' => Group::find($group->id),
        'message' => "Create a new group success",
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

  /** 
  * Get group details by groupId, If group id not given, current user groups will be retrieve.
  */
  public function get(Request $request, string $groupId = null): JsonResponse {
    // TODO: Return current user groups if groupId not given
    if (!$groupId) {
      return response()->json([
        'status' => 200,
        'data' => $request->user()->groups->groupBy('id'),
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

  /**
  * Update group details
  */
  public function update(GroupUpdateRequest $request, string $groupId = null): JsonResponse {
    $data = $request->validated();

    // TODO: Check is group id given & valid, user is an admin in related group
    $group = Group::findOr($groupId, function () {
      return false;
    });
    $isAdmin = GroupMember::where([
      'user_id' => $request->user()->id,
      'group_id' => $groupId,
      'is_admin' => true,
    ])->firstOr(function () {
      return false;
    });

    if (!$groupId || !$group || !$isAdmin) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'Group not found!'
      ], 404));
    }

    // TODO: Update group details
    // Update avatar if uploaded
    if ($avatar = $request->file('avatar')) {
      $path = $avatar->storeAs('public/groups/avatar', uniqid() . '.' . $avatar->extension());
      $link = Storage::url($path);

      // Delete old avatar file if exist
      if ($oldAvatar = $group->avatar) {
          Storage::has($path) && Storage::delete($path);
      }
      
      $data['avatar'] = $link;
      $group->avatar = $request->avatar;
    }

    $group->fill($data);
    $group->save();

    return response()->json([
      'status' => 200,
      'data' => $group,
      'message' => 'Update group details success'
    ], 200);
  }

  /**
   * Accept join request received from inbox with type 'group-join-request'
   */
  public function accept(GroupAcceptJoinRequest $request, string $groupId = null): JsonResponse {
    $data = $request->validated();

    // TODO: Check group id & inbox id is valid
    $group = Group::findOr($groupId, fn() => false);
    $inbox = Inbox::where([
      'id' => $data['inbox_id'],
      'type' => 'group-join-request',
      'sender_id' => $data['sender_id'],
      'receiver_id' => $groupId
    ])->firstOr(fn() => false);
    
    if (!$groupId || !$group || !$inbox) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'Group not found'
      ], 404));
    };

    // TODO: Check is current user is admin in related group
    $isAdmin = GroupMember::where([
      'group_id' => $groupId,
      'user_id' => $request->user()->id,
      'is_admin' => true
    ])->firstOr(fn() => false);

    if (!$isAdmin) {
      throw new HttpResponseException(response()->json([
        'status' => 401,
        'data' => null,
        'message' => 'Unauthorized'
      ], 401));
    }

    // TODO: Add user to group member model
    try {
      $addedUserToGroupMember = GroupMember::create([
        'group_id' => $groupId,
        'user_id' => $data['sender_id']
      ]);

      // Delete inbox after adding to group member
      $inbox->delete();
      
      return response()->json([
        'status' => 201,
        'data' => $addedUserToGroupMember,
        'message' => 'Accept group join request success'
      ], 201);
    } catch (Exception $exception) {
      throw new HttpResponseException(request()->json([
        'status' => 500,
        'data' => null,
        'message' => $exception->getMessage(),
      ], 500));
    }
  }

  /**
   * Reject join request received from inbox with type 'group-join-request'
   */
  public function reject(GroupAcceptJoinRequest $request, string $groupId): JsonResponse {
    $data = $request->validated();

    // TODO: Check group id & inbox id is valid
    $group = Group::findOr($groupId, fn() => false);
    $inbox = Inbox::where([
      'id' => $data['inbox_id'],
      'type' => 'group-join-request',
      'sender_id' => $data['sender_id'],
      'receiver_id' => $groupId
    ])->firstOr(fn() => false);

    if (!$groupId || !$group || !$inbox) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => 'Group not found'
      ], 404));
    };

    // TODO: Check is current user is admin in related group
    $isAdmin = GroupMember::where([
      'group_id' => $groupId,
      'user_id' => $request->user()->id,
      'is_admin' => true
    ])->firstOr(fn() => false);

    if (!$isAdmin) {
      throw new HttpResponseException(response()->json([
        'status' => 401,
        'data' => null,
        'message' => 'Unauthorized'
      ], 401));
    }

    // TODO: Add user to group member model
    try {
      // Delete inbox after adding to group member
      $inbox->delete();
      
      return response()->json([
        'status' => 200,
        'data' => null,
        'message' => 'Reject group join request success'
      ], 200);
    } catch (Exception $exception) {
      throw new HttpResponseException(request()->json([
        'status' => 500,
        'data' => null,
        'message' => $exception->getMessage(),
      ], 500));
    }
  }

  /**
   * Post group invitation
   */
  public function invite(GroupInviteRequest $request, string $groupId): JsonResponse {
    $data = $request->validated();

    // TODO: Validate group id is valid
    $group = Group::find($groupId);
    if ($group === null) {
      throw new HttpResponseException(response()->json([
          'status' => 404,
          'data' => null,
          'message' => 'Group not found'
      ], 404));
    }

    // TODO: Validate is current user is a admin from related group, reject if not
    $isAdmin = GroupMember::where([
      'group_id' => $group->id,
      'user_id' => $request->user()->id,
      'is_admin' => 1,
    ])->first();

    if ($isAdmin === null) {
      throw new HttpResponseException(response()->json([
          'status' => 401,
          'data' => null,
          'message' => 'Only an admin can invite someone into a group'
      ], 401));
    }

    DB::beginTransaction();
    try {
      foreach ($data['users_id'] as $user_id) {
        // TODO: Validate is user is in current user contact
        $isInContacts = User::with('contacts')->whereRelation('contacts', 'user_id', $user_id)->first();
  
        if ($isInContacts === null) {
          throw new HttpResponseException(response()->json([
            'status' => 404,
            'data' => null,
            'message' => 'User with id ' . $user_id . ' is not listed in contacts'
          ], 404));
        }

        // Check is exist
        $isExist = Inbox::where([
          'sender_id' => $group->id,
          'receiver_id' => $user_id,
          'type' => 'group',
        ])->first();

        if ($isExist !== null) {
          return response()->json([
            'status' => 200,
            'data' => $isExist,
            'message' => 'Group invitation already exist'
          ], 200);
        }

        // TODO: Create inbox
        $inbox = Inbox::create([
          'sender_id' => $group->id,
          'receiver_id' => $user_id,
          'type' => 'group',  
        ]);
      }

      DB::commit();

      broadcast(new InboxSent($inbox->receiver_id, array($inbox)))->toOthers();
      return response()->json([
        'status' => 201,
        'data' => null,
        'message' => 'Invite contacts into a group success',
      ], 201);
    } catch (HttpResponseException $exception) {
      DB::rollBack();

      throw new HttpResponseException($exception->getResponse());
    }
  }

  public function deleteAvatar(Request $request, string $groupId) {
    // TODO: Validate group id is vali
    $group = Group::find($groupId);
    if ($group === null) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => "Group not found"
      ], 404));
    }

    // TODO: Validate is curent user is an admin in related group
    $isAdmin = GroupMember::where([
      'user_id' => $request->user()->id,
      'group_id' => $groupId,
      'is_admin' => 1
    ])->first();

    if ($isAdmin === null) {
      throw new HttpResponseException(response()->josn([
        'status' => 401,
        'data' => null,
        'message' => 'Only an admin can update group details'
      ], 401));
    }

    // TODO: Delete avatar if exist
    DB::beginTransaction();
    try {
        if ($group->avatar !== null) {
          Storage::delete($group->avatar);
          $group->avatar = null;
          $group->save();
        }

        return response()->json([
          'status' => 200,
          'data' => $group->fresh(),
          'message' => 'Group avatar deleted'
        ], 200);
    } catch (Exception $exception) {
        DB::rollBack();

        throw new HttpResponseException(response()->json([
          'status' => 500,
          'data' => null,
          'message' => $exception->getMessage(),
        ], 500));
    }
  }

  public function acceptInvite(Request $request, string $inboxId) {
    $inbox = Inbox::find($inboxId);

    if ($inbox === null) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => "Inbox not found!"
      ], 404));
    }

    DB::beginTransaction();
    try {
      $join = GroupMember::create([
        'group_id' => $inbox->sender_id,
        'user_id' => $inbox->receiver_id,
      ]);

      $inbox->delete();
      DB::commit();
      
      return response()->json([
        'status' => 201,
        'data' => $join,
        'message' => "Accept group invitation success"
      ], 201);
    }
    catch (exception $exception) {
      DB::rollBack();
      throw new HttpResponseException(response()->json([
        'status' => 500,
        'data' => null,
        'message' => "Internal server error"
      ], 500));
    }
  }

  public function rejectInvite(Request $request, string $inboxId) {
    $inbox = Inbox::find($inboxId);
    
    if ($inbox === null) {
      throw new HttpResponseException(response()->json([
        'status' => 404,
        'data' => null,
        'message' => "Inbox not found!"
      ], 404));
    }

    DB::beginTransaction();
    try {
      $inbox->delete();
      DB::commit();

      return response()->json([
          'status' => 200,
          'data' => null,
          'message' => "Reject group invitation success"
      ], 200);
      
    } catch (Exception $exception) {
      DB::rollBack();
      throw new HttpResponseException(response()->json([
        'status' => 500,
        'data' => null,
        'message' => "Internal server error"
      ], 500));
    }
  }
}
