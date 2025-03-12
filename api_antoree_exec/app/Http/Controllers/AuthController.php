<?php

namespace App\Http\Controllers;

use App\Enums\Message;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Rules\AuthRule;
use Illuminate\Validation\ValidationException;
use App\Services\AuthService;
use Exception;
use Illuminate\Http\Response;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

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
    public function login(Request $request) 
    {
        try {
            $credentials = $request->validate(
                AuthRule::loginRules(),
                AuthRule::loginMessages()
            );

            $token = JWTAuth::attempt($credentials);

            if (!$token) {
                return apiResponse(Message::ERROR, null, Response::HTTP_BAD_REQUEST);
            }

            return apiResponse(Message::SUCCESS, $token, Response::HTTP_OK);

        } catch (ValidationException $e) {
            return apiResponse($e->validator->errors()->first(), null, Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (JWTException  $e) {
            return apiResponse('Lỗi token !', null, Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (Exception  $e) {
            return apiResponse(Message::ERROR, null, Response::HTTP_UNPROCESSABLE_ENTITY);

        }
        
        
    }

    // [POST]::/api/register
    public function register(Request $request): mixed
    {
        try {
            $credentials = $request->validate(
                AuthRule::registerRules(),
                AuthRule::registerMessages()
            );

            $user = $this->authService->registerUser($credentials);
            $token = JWTAuth::fromUser($user);

            return apiResponse(Message::CREATED_SUCCESS, [
                'user' => $user,
                'token' => $token
            ], Response::HTTP_CREATED);
            
        } catch (ValidationException $e) {
            return apiResponse($e->validator->errors()->first(), null, Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (JWTException  $e) {
            return apiResponse('Lỗi token !', null, Response::HTTP_UNPROCESSABLE_ENTITY);

        } catch (Exception  $e) {
            return apiResponse(Message::ERROR, null, Response::HTTP_UNPROCESSABLE_ENTITY);

        }
    }

}
