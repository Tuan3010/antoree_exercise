<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Rules\UserRule;
use App\Services\UserService;
use Illuminate\Validation\ValidationException;
use App\Enums\Role;
use App\Enums\Message;
use Exception;
use Illuminate\Http\Response;

class UserController extends Controller
{
    /**
     * @var UserService
     */
    protected UserService $userService;

    public function __construct(UserService $userService)
    {
        $this->userService = $userService;
    }


    /**
     * Display a listing of the resource.
     */
    public function showAllUser()
    {
        try {
            $users = User::all();
            return apiResponse(Message::SUCCESS_RECORD, $users, Response::HTTP_OK);
            
        } catch (Exception $e) {
            return apiResponse($e->getMessage(), null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeUser(Request $request)
    {
        try {
            $credentials = $request->validate(
                UserRule::userRules(),
                UserRule::userMessages()
            );

            $this->userService->createUser($credentials);

            return apiResponse(Message::CREATED_SUCCESS, $credentials, Response::HTTP_CREATED);
        } catch (ValidationException $e) {

            return apiResponse($e->validator->errors(), null, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showUser(string $userId)
    {
        $user = User::find($userId);
        
        try {
            return apiResponse(Message::SUCCESS_RECORD, $user, Response::HTTP_OK);

        } catch (\Throwable $th) {
            return apiResponse(Message::ERROR, null, Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function editUser(Request $request, int $userId)
    {
        $role = ['supper_admin' => 3, 'admin' => 2, 'user' => 1];
        try {
            $selfUser = auth()->user();
            $user = User::find($userId);
            if (!$user) {
                return apiResponse(Message::NOT_FOUND, null, Response::HTTP_NOT_FOUND);
            }

            $credentials = $request->validate(
                UserRule::userRules($userId),
                UserRule::userMessages()
            );

            if ($selfUser->id === $user->id) {
                $this->userService->updateUser($credentials, $userId);
                return apiResponse(Message::UPDATED_SUCCESS, null, Response::HTTP_OK);
            }

            if ($role[$selfUser->role] <= $role[$user->role]) {
                return apiResponse(Message::UPDATED_ROLE, null, Response::HTTP_FORBIDDEN);
            }

            $response = $this->userService->updateUser($credentials, $userId);

            return apiResponse(Message::UPDATED_SUCCESS, null, Response::HTTP_OK);

        } catch (ValidationException $e) {
            return apiResponse($e->validator->errors(), null, Response::HTTP_UNPROCESSABLE_ENTITY);

        } 
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyUser(int $userId)
    {
        $selfUser = auth()->user();
        try {

            $user = User::find($userId);
            if (!$user) {
                return apiResponse(Message::NOT_FOUND, null, Response::HTTP_NOT_FOUND);
            }
    
            if ($selfUser->id === $user->id) {
                return apiResponse(Message::DELETED_SELF_ERROR, null, Response::HTTP_BAD_REQUEST);
            }
    
            if ($selfUser->role == $user->role || $user->role == Role::SUPPERADMIN) {
                return apiResponse(Message::DELETED_ADMIN_ERROR, null, Response::HTTP_FORBIDDEN);
            }

            $user->delete();
            return apiResponse(Message::SUCCESS, null, Response::HTTP_OK);

        } catch (\Throwable $th) {
            return apiResponse(Message::ERROR, null, Response::HTTP_INTERNAL_SERVER_ERROR);

        }
    }
}
