<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use App\Rules\UserRule;
use App\Services\UserService;
use Illuminate\Validation\ValidationException;

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

            return response()->json($users);
        } catch (\Throwable $th) {
            return response()->json('404');
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

            return response()->json($credentials);
            
        } catch (ValidationException $e) {
            return response()->json([
                'errors' => $e->validator->errors()->first()
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function showUser(string $id)
    {
        try {
            $response = User::find($id);
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
    public function destroyUser(int $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['message' => 'Người dùng không tồn tại'],404);
        }

        try {
            $user->delete();
            return response()->json(['message' => 'Xóa thành công !']);

        } catch (\Throwable $th) {
            return response()->json(['message' => '505']);
        }
    }
}
