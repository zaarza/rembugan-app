<?php

use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->get('/validate', function () {
    return response()->json([], 200);
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

Route::get('/messages', [App\Http\Controllers\MessageController::class, 'get'])->middleware('auth:sanctum');
Route::get('/messages/{id}', [App\Http\Controllers\MessageController::class, 'get'])->middleware('auth:sanctum');
Route::post('/messages', [App\Http\Controllers\MessageController::class, 'post'])->middleware('auth:sanctum');
Route::post('/messages/{messageId}/markReaded', [App\Http\Controllers\MessageController::class, 'markReaded'])->middleware('auth:sanctum');

Route::get('/inbox', [App\Http\Controllers\InboxController::class, 'get'])->middleware('auth:sanctum');
Route::post('/inbox', [App\Http\Controllers\InboxController::class, 'post'])->middleware('auth:sanctum');

Route::post('/groups', [App\Http\Controllers\GroupController::class, 'new'])->middleware('auth:sanctum');
Route::get('/groups', [App\Http\Controllers\GroupController::class, 'get'])->middleware('auth:sanctum');
Route::get('/groups/{groupId}', [App\Http\Controllers\GroupController::class, 'get'])->middleware('auth:sanctum');
Route::delete('/groups/{groupId}/leave', [App\Http\Controllers\GroupController::class, 'leave'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}', [App\Http\Controllers\GroupController::class, 'update'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}/accept', [App\Http\Controllers\GroupController::class, 'accept'])->middleware('auth:sanctum');
Route::post('/groups/{groupId}/reject', [App\Http\Controllers\GroupController::class, 'reject'])->middleware('auth:sanctum');

Route::get('/groupMessages', [App\Http\Controllers\GroupMessageController::class, 'get'])->middleware('auth:sanctum');
Route::get('/groupMessages/{groupId}', [App\Http\Controllers\GroupMessageController::class, 'get'])->middleware('auth:sanctum');