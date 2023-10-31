<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ConversationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Broadcast;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Broadcast::routes();

Route::middleware('auth:sanctum')->get('/validate', function () {
    return http_response_code(200);
});

Route::post('/users', [\App\Http\Controllers\UserController::class, 'register']);
Route::delete('/users/deleteAvatar', [\App\Http\Controllers\UserController::class, 'deleteAvatar']);
Route::post('/users/login', [\App\Http\Controllers\UserController::class, 'login']);
Route::get('/users', [\App\Http\Controllers\UserController::class, 'details']);
Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'details']);
Route::post('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);

Route::get('/contacts', [App\Http\Controllers\ContactController::class, 'list'])->middleware('auth:sanctum');
Route::post('/contacts/{id}', [App\Http\Controllers\ContactController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/contacts/{id}',[App\Http\Controllers\ContactController::class, 'delete'])->middleware('auth:sanctum');
Route::post('/contacts/{senderId}/accept',[App\Http\Controllers\ContactController::class, 'accept'])->middleware('auth:sanctum');
Route::delete('/contacts/{senderId}/reject',[App\Http\Controllers\ContactController::class, 'reject'])->middleware('auth:sanctum');

Route::get('/conversations', [ConversationController::class, 'get'])->middleware('auth:sanctum');
Route::post('/conversations/', [ConversationController::class, 'post'])->middleware('auth:sanctum');
Route::post('/conversations/{conversationId}', [ConversationController::class, 'post'])->middleware('auth:sanctum');

Route::get('/inbox', [App\Http\Controllers\InboxController::class, 'get'])->middleware('auth:sanctum');
Route::post('/inbox', [App\Http\Controllers\InboxController::class, 'post'])->middleware('auth:sanctum');

Route::post('/groups', [App\Http\Controllers\GroupController::class, 'new'])->middleware('auth:sanctum');
Route::get('/groups', [App\Http\Controllers\GroupController::class, 'get'])->middleware('auth:sanctum');
Route::get('/groups/{groupId}', [App\Http\Controllers\GroupController::class, 'get'])->middleware('auth:sanctum');
Route::delete('/groups/{groupId}/leave', [App\Http\Controllers\GroupController::class, 'leave'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}', [App\Http\Controllers\GroupController::class, 'update'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}/invite', [App\Http\Controllers\GroupController::class, 'invite'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}/accept', [App\Http\Controllers\GroupController::class, 'accept'])->middleware('auth:sanctum');
Route::post('/groups/{inboxId}/acceptInvite', [App\Http\Controllers\GroupController::class, 'acceptInvite'])->middleware('auth:sanctum');
Route::post('/groups/{inboxId}/rejectInvite', [App\Http\Controllers\GroupController::class, 'rejectInvite'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}/reject', [App\Http\Controllers\GroupController::class, 'reject'])->middleware('auth:sanctum');
Route::delete('/groups/{groupId}/deleteAvatar', [App\Http\Controllers\GroupController::class, 'deleteAvatar'])->middleware('auth:sanctum');

Route::get('/groupMessages', [App\Http\Controllers\GroupMessageController::class, 'get'])->middleware('auth:sanctum');
Route::get('/groupMessages/{groupId}', [App\Http\Controllers\GroupMessageController::class, 'get'])->middleware('auth:sanctum');
Route::post('/groupMessages/{groupId}', [App\Http\Controllers\GroupMessageController::class, 'post'])->middleware('auth:sanctum');

Route::delete('/groupMembers/{groupId}/{userId}/kick', [\App\Http\Controllers\GroupMemberController::class, 'kick'])->middleware('auth:sanctum');
Route::post('/groupMembers/{groupId}/{userId}/setAdmin', [\App\Http\Controllers\GroupMemberController::class, 'setAdmin'])->middleware('auth:sanctum');

Route::get('/test', function () {
    return response()->json(["message" => "Hello world"]);
});