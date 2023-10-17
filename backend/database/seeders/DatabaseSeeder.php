<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Inbox;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $user1 = User::create([
            'id' => 'alpha',
            'name' => 'Alpha',
            'email' => 'alpha@email.com',
            'password' => '12345678'
        ]);

        $user2 = User::create([
            'id' => 'beta',
            'name' => 'Beta',
            'email' => 'beta@email.com',
            'password' => '12345678'
        ]);
    }
}
