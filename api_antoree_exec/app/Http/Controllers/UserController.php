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

            return apiResponse($e->validator->errors()->first(), null, Response::HTTP_UNPROCESSABLE_ENTITY);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showUser(string $userId)
    {
        try {
            $response = User::find($userId);
            return response()->json($response);
        } catch (\Throwable $th) {
            return response()->json($th);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function editUser(Request $request, int $userId)
    {
        $user = User::find($userId);
        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại']);
        }

        try {
            $credentials = $request->validate(
                UserRule::userRules($userId)
            );

            $response = $this->userService->updateUser($credentials, $userId);

            return response()->json(['message' => 'Sửa thành công !']);

        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors()->first()
            ], 422);
        }
        

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroyUser(int $userId)
    {
        $selfUser = auth()->user();
        $user = User::find($userId);

        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'],404);
        }

        if ($selfUser->id === $user->id) {
            return response()->json(['message' => 'Bạn không thể xóa chính mình'],404);
        }

        if ($selfUser->role == $user->role || $user->role == Role::SUPPERADMIN) {
            return response()->json(['message' => 'Bạn không có quyền xóa admin khác'],404);
        }

        try {
            $user->delete();
            return response()->json(['message' => 'Xóa thành công !']);

        } catch (\Throwable $th) {
            return response()->json(['message' => '505']);
        }
    }
}
