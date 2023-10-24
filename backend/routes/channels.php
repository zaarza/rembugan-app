<?php

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\User;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

// Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
//     return (int) $user->id === (int) $id;
// });

Broadcast::channel('App.Models.User.{id}', function ($user, $id) {
    return true;
});

Broadcast::channel('chat.{id}', function ($user, $id) {
    $isExistOnContact = Contact::where([
        'added_by' => $id,
        'user_id' => $user->id    
    ])->first();

    if ($id === $user->id || $isExistOnContact !== null) {
        return $user->toArray();
    } else {
        return false;
    }
});
