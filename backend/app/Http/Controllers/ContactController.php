<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Contact;
use App\Models\User;
use ErrorException;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    // get current logged in user saved contacts
    public function list(Request $request) {
        return response()->json([
            'status' => 200,
            'data' => $request->user()->contacts,
            'message' => 'Get contacts success'
        ], 200);
    }

    public function add(string $id, Request $request) {
        if (!User::where('id', $id)) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'User not found'
            ], 404));
        }

        // Don't recreate if exist
        if (Contact::where('user_id', $id)->first()) {
            return response()->json([
                'status' => 201,
                'data' => Contact::with(['details'])->where('added_by', $request->user()->id),
                'message' => 'Contact already exist',
            ], 201);
        }

        DB::beginTransaction();
        try {
            Contact::create([
                'user_id' => $id,
                'added_by' => $request->user()->id,
            ]);
    
            Contact::create([
                'user_id' => $request->user()->id,
                'added_by' => $id,
            ]);
            DB::commit();

            return response()->json([
                'status' => 201,
                'data' => Contact::with(['details'])->where('added_by', $request->user()->id),
                'message' => 'Add to contact list success',
            ], 201);
        } catch (\Exception $exception) {
            DB::rollBack();

            return response()->json([
                'status' => 500,
                'data' => null,
                'message' => 'Add to contact list failed',
            ], 500);
        }
    }
}
