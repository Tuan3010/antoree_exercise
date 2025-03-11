<?php

namespace App\Services;

use App\Repositories\AuthRepository;

class AuthService {
    /**
     * @var
     */
    protected AuthRepository $authRepo;

    public function __construct(AuthRepository $authRepo)
    {
        $this->authRepo = $authRepo;
    }

    /**
     * @param array $data
     * @return mixed
     */
    public function registerUser(array $credentials): mixed 
    {
        $data = [
            'name' => $credentials['name'],
            'password' => $credentials['password'],
            'email' => $credentials['email'],
            'created_at' => now(),
        ];

        return $this->authRepo->registerRepo($data);
    }
}