<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\Contact;
use App\Models\Inbox;
use App\Models\User;
use ErrorException;
use Exception;
use Illuminate\Database\Query\Builder;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ContactController extends Controller
{
    // get current logged in user saved contacts
    public function list(Request $request) {
        $result = Contact::with('details')
            ->where('added_by', $request->user()->id)
            ->when($request->name, function($query, string $nameQuery) {
                $query->whereRelation('details', 'name', 'LIKE', "%$nameQuery%");
            })->get();

        return response()->json([
            'status' => 200,
            'data' => $result,
            'message' => 'Get contacts success'
        ], 200);
    }

    public function add(string $id, Request $request) {
        if (!User::where('id', $id)->first()) {
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

    public function delete(string$id, Request $request) {
        //  fail if no user with given id
        if (!User::where('id', $id)->first()) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'User not found'
            ], 404));
        }

        // fail if that user id is not in current user contacts
        if (!$contact = Contact::where([
            'user_id' => $id,
            'added_by' => $request->user()->id,
        ])->first()) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'User is not exist in contacts'
            ], 404));
        }

        DB::beginTransaction();
        try {
            $contact->delete();
            DB::commit();
            return response()->json([
                'status' => 200,
                'data' => null,
                'message' => 'User deleted from contacts success'
            ], 200);
        } catch (ErrorException $error) {
            DB::rollBack();
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $error->getMessage(),
            ], 500));
        }
    }

    /**
     * Accept friend request from inbox with type 'friend'
     */
    public function accept(Request $request, string $senderId = null): JsonResponse {
        // TODO: Check is inbox id valid
        $inbox = Inbox::where([
            'receiver_id' => $request->user()->id,
            'sender_id' => $senderId,
            'type' => 'friend'
        ])->first();

        // Not valid / not found
        if (!$senderId || $inbox == null) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'Inbox not found'
            ], 404));
        }

        // Valid
        DB::beginTransaction();
        try {
            // TODO: Add to contacts
            $contact = Contact::firstOrCreate([
                'added_by' => $request->user()->id,
                'user_id' => $senderId
            ]);
            Contact::firstOrCreate([
                'user_id' => $request->user()->id,
                'added_by' => $senderId
            ]);
            
            // TODO: Delete inbox
            $inbox->delete();

            // TODO: Send success response
            DB::commit();
            return response()->json([
                'status' => 201,
                'data' => $contact,
                'message' => 'Accept friend request success'
            ], 201);
        } catch (Exception $exception) {
            // TODO: Send failed response
            DB::rollBack();
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage()
            ], 500));
        }
    }


    /**
     * Reject friend request from inbox with type 'friend'
     */
     public function reject(Request $request, string $senderId = null) {
        // TODO: Check is inbox id valid
        $inbox = Inbox::where([
            'receiver_id' => $request->user()->id,
            'sender_id' => $senderId,
            'type' => 'friend'
        ])->first();

        // Not valid / not found
        if (!$senderId || $inbox == null) {
            throw new HttpResponseException(response()->json([
                'status' => 404,
                'data' => null,
                'message' => 'Inbox not found'
            ], 404));
        }

        // Valid
        DB::beginTransaction();
        try {
            // TODO: Delete from inbox
            $inbox->delete();

            // TODO: Send success response
            DB::commit();
            return response()->json([
                'status' => 200,
                'data' => null,
                'message' => 'Reject friend request success'
            ], 200);
        } catch (Exception $exception) {
            // TODO: Send failed response
            DB::rollBack();
            throw new HttpResponseException(response()->json([
                'status' => 500,
                'data' => null,
                'message' => $exception->getMessage()
            ], 500));
        }
    }
}
