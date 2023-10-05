<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

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
}
