<?php

namespace App\Rules;

use Illuminate\Validation\Rule;
use App\Enums\Role;

class AuthRule
{
    public static function registerRules(): array
    {
        return [
            'name' => [
                'required',
                'unique:users,name',
                'max:30',
                'min:8',
            ],
            'password' => 'required|min:6|max:30',
            'email' => [
                'required',
                'email',
                'unique:users,email'
            ],
            'role' => 'in:'. implode(',', Role::getValues()),
        ];
    }

    /**
     * @return array
     */
    public static function registerMessages(): array
    {
        return [
            'name.required' => 'Tên là bắt buộc.',
            'name.max' => 'Tên không được dài quá 30 ký tự.',
            'name.min' => 'Tên ít nhất phải 8 ký tự',
            'name.unique' => 'Tên này đã được sử dụng.',
            
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',
            
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',

            'role.in' => 'Role không hợp lệ'
            
        ];
    }


    public static function loginRules(): array
    {
        return [
            'name' => 'required|min:8|max:30',
            'password' => 'required|min:6|max:30',
        ];
    }

    public static function loginMessages(): array
    {
        return [
            'name.required' => 'Không bỏ trống trường name.',
            'name.max' => 'Tên không được dài quá 30 ký tự.',
            'name.min' => 'Tên ít nhất phải 8 ký tự',

            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.max' => 'Mật khẩu không được dài quá 30 ký tự.',
            'password.min' => 'Mật khẩu ít nhất phải 6 ký tự',
        ];
    }
}
