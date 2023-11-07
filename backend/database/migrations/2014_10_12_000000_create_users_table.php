<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->ulid('id');
            $table->string('name');
            $table->string('description')->nullable();
            $table->string('email')->unique();
            $table->string('status')->nullable();
            $table->string('avatar')->nullable();
            $table->boolean('is_online')->default(false);
            $table->string('password');
            $table->timestamp('last_seen')->nullable();
            $table->integer('joined_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
