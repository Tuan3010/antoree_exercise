<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Request;

Route::get('/', function (Request $request) {
    return response('Api is running with nginx ...');
});

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::middleware('is_auth')->prefix('admin/user')->group(function () {
    Route::get('/', [UserController::class,'showAllUser'])->middleware('role:supper_admin,admin');
    Route::get('/{userId}', [UserController::class,'showUser']);
    Route::post('/store', [UserController::class,'storeUser'])->middleware('role:supper_admin');
    Route::put('/edit/{userId}', [UserController::class,'editUser']);
    Route::delete('/destroy/{userId}', [UserController::class,'destroyUser'])->middleware('role:supper_admin,admin');
});