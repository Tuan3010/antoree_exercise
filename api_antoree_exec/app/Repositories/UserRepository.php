<?php
namespace App\Repositories;

use App\Models\User;

class UserRepository 
{
    /**
     * @param array $data
     * @return mixed
     */
    public function createUserRepo(array $data) 
    {
        return User::create($data);
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function updateUserRepo(array $data,int $id)
    {
        $user = User::find($id);
        $user->update($data);
    }
}