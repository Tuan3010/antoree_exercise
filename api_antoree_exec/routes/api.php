<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('login', [AuthController::class, 'login']);
Route::post('register', [AuthController::class, 'register']);


Route::prefix('admin/')->group(function () {
    Route::get('/user', [UserController::class,'showAllUser']);
    Route::get('/user/{id}', [UserController::class,'showUser']);
    Route::post('/user/store', [UserController::class,'storeUser']);
    Route::put('/user/edit/{userId}', [UserController::class,'editUser']);
    Route::delete('/user/destroy/{id}', [UserController::class,'destroyUser']);
});