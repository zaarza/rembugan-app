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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/users', [\App\Http\Controllers\UserController::class, 'register']);
Route::post('/users/login', [\App\Http\Controllers\UserController::class, 'login']);
Route::get('/users/{id}', [\App\Http\Controllers\UserController::class, 'details']);
Route::post('/users/{id}', [\App\Http\Controllers\UserController::class, 'update']);

Route::get('/contacts', [App\Http\Controllers\ContactController::class, 'list'])->middleware('auth:sanctum');
Route::post('/contacts/{id}', [App\Http\Controllers\ContactController::class, 'add'])->middleware('auth:sanctum');
Route::delete('/contacts/{id}',[App\Http\Controllers\ContactController::class, 'delete'])->middleware('auth:sanctum');

Route::post('/messages', [App\Http\Controllers\MessageController::class, 'post'])->middleware('auth:sanctum');