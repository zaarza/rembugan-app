<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserLoginRequest;
use App\Http\Requests\UserRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

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

    public function details(string $id): JsonResponse {
        $user = User::where('id', $id)->first();

        if (!$user) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => "User not found"
            ], 404));
        }

        return response()->json([
            'status' => 200,
            'data' => new UserResource($user),
            'message' => "Get user detail success"
        ]);
    }
}
