<?php

namespace App\Services;

use App\Repositories\UserRepository;
use PhpParser\Node\Expr\FuncCall;

class UserService 
{
    /**
     * @var
     */
    protected UserRepository $userRepo;

    public function __construct(UserRepository $userRepo)
    {
        $this->userRepo = $userRepo;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function createUser(array $credentials): mixed 
    {
        $data = [
            'name' => $credentials['name'],
            'password' => $credentials['password'],
            'email' => $credentials['email'],
            'created_at' => now(),
        ];

        return $this->userRepo->createUserRepo($data);
    }

    /**
     * @param array $credentials
     * @return mixed
     */
    public function updateUser(array $credentials, int $userId): mixed 
    {
        $data = [
            'name' => $credentials['name'],
            'email' => $credentials['email'],
            'updated_at' => now(),
        ];

        return $this->userRepo->updateUserRepo($data, $userId);
    }

}