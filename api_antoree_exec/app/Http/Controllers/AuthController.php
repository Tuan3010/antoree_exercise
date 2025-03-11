<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Rules\UserRule;
use Illuminate\Validation\ValidationException;
use App\Services\AuthService;

class AuthController extends Controller
{

    /**
     * @var AuthService
     */
    protected AuthService $authService;

    public function __construct(AuthService $authService)
    {
        $this->authService = $authService;
    }

    // [POST]::/api/login
    public function login(Request $request) {
        // echo($request);
        return response()->json('Login hanle');
    }

    /**
     * @param $request
     * @return array
     */
    public function register(Request $request): mixed
    {
        try {
            $credentials = $request->validate(
                UserRule::userRules()
            );

            $this->authService->registerUser($credentials);

            return response()->json(['message' => 'Đăng kí thành công !']);
            
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors()->first()
            ], 422);
        }
    }

}
