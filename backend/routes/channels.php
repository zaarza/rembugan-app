<?php

use App\Models\Contact;
use App\Models\Conversation;
use App\Models\ConversationParticipant;
use App\Models\GroupMember;
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

Broadcast::channel('group.{groupId}', function ($user, $groupId) {
    // TODO: Check is current user a member in related group
    $result = GroupMember::where([
        'group_id' => $groupId,
        'user_id' => $user->id
    ])->first();

    if ($result !== null) {
        return $result->toArray();
    } else {
        return false;
    }
});
