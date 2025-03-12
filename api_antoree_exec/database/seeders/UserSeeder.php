<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'duytuan_admin',
                'email' => 'tuanly.0234@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'supper_admin',
                'created_at' => now(),
            ],
            [
                'name' => 'nguoidung1',
                'email' => 'nguoidung1@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'user',
                'created_at' => now(),
            ],
            [
                'name' => 'nguoidung2',
                'email' => 'nguoidung2@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'user',
                'created_at' => now(),
            ],
            [
                'name' => 'quantri1',
                'email' => 'quantri1@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'admin',
                'created_at' => now(),
            ],
            [
                'name' => 'quantri2',
                'email' => 'quantri2@gmail.com',
                'password' => Hash::make('123456'),
                'role' => 'admin',
                'created_at' => now(),
            ],
        ]);
    }
}
