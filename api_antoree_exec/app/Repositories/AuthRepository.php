<?php
namespace App\Repositories;

use App\Models\User;

class AuthRepository 
{
    /**
     * @param array $data
     * @return mixed
     */
    public function registerRepo(array $data) 
    {
        return User::create($data);
    }
}