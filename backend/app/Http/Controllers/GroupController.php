<?php

namespace App\Http\Controllers;

use App\Http\Requests\GroupNewRequest;
use App\Http\Requests\StoreGroupRequest;
use App\Http\Requests\UpdateGroupRequest;
use App\Models\Group;
use App\Models\GroupMember;
use Exception;
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
}
