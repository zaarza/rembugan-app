<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Exception;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class UserController extends Controller
{
    public function register(UserRegisterRequest $request): JsonResponse {
        $data = $request->validated();
        $data['password'] = Hash::make($data['password']);
        $user = new User($data);
        $user->save();

        return response()->json([
            'status' => 201,
            'data' => new UserResource($user),
            'message' => 'Register success',
        ], 201);
    }

    public function login(UserLoginRequest $request): JsonResponse {
        $data = $request->validated();
        
        if (!Auth::attempt($data)) {
            throw new HttpResponseException(response()->json([
                'status' => 401,
                'data' => null,
                'message' => 'Login failed, Invalid email or password'
            ], 401));
        }

        return response()->json([
            'status' => 200,
            'data' => new UserResource($request->user()),
            'message' => 'Login success'
        ], 200);
    }

    public function details(Request $request, string $id = null): JsonResponse {
        $user = [];

        // TODO: Send current user details if id not given
        if (!$id) {
            $user = new UserResource($request->user());
        } else {
            // TODO: Send related user
            $user = User::where('id', $id)->first();

            // * Not found
            if (!$user) {
                throw new HttpResponseException(response()->json([
                    'status' => 404,
                    'data' => null,
                    'message' => "User not found"
                ], 404));
            }
        }

        // * User found
        return response()->json([
            'status' => 200,
            'data' => $user,
            'message' => "Get user detail success"
        ]);
    }

    public function update(UserUpdateRequest $request, string $id) {
        $data = $request->validated();

        // User not found
        if (!$id || !$user = User::where('id', $id)->first()) {
            throw new HttpResponseException(response()->json([
                'status', 404,
                'data' => null,
                'message' => 'User not found'
            ], 404));
        }

        // Update avatar if image uploaded
        if ($avatar = $request->file('avatar')) {
            $path = $avatar->storeAs('public/users/avatar', uniqid() . '.' . $avatar->extension());
            $link = Storage::url($path);

            // Delete old avatar file if exist
            if ($oldAvatar = $user->avatar) {
                Storage::delete($oldAvatar);
            }
            
            $data['avatar'] = $link;
            $user->avatar = $request->avatar;
        }

        $user->fill($data);
        $user->save();

        return response()->json([
            'status' => 200,
            'data' => new UserResource($user),
            'message' => "Update user details success"
        ]);
    }

    public function deleteAvatar(Request $request) {
        try {
            $user = $request->user();
            if ($oldAvatar = $user->avatar) {
                Storage::delete($oldAvatar);
                $user->avatar = '';
                $user->save();
            }

            return response()->json([
                'status' => 200,
                'data' => new UserResource($user->fresh()),
                'message' => "Delete avatar success"
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
