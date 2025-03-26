<?php

namespace App\Rules;

use Illuminate\Validation\Rule;
use App\Enums\Role;

class UserRule
{
    public static function userRules($userId = null): array
    {

        return [
            'name' => [
                'required',
                Rule::unique('users','name')->ignore($userId),
                'max:30',
                'min:8',
            ],
            'password' => $userId ? 'min:6|max:30' : 'required|min:6|max:30',
            'email' => [
                'required',
                'email',
                Rule::unique('users','email')->ignore($userId)
            ],
            'role' => 'in:'. implode(',', Role::getValues()),
            'age' => 'max:100|min:10|integer',
            'phone' => 'regex:/^0[1-9][0-9]{8,9}$/'
        ];
    }

    /**
     * @return array
     */
    public static function userMessages(): array
    {
        return [
            'name.required' => 'Tên là bắt buộc.',
            'name.max' => 'Tên không được dài quá 30 ký tự.',
            'name.min' => 'Tên không được ít hơn 8 ký tự',
            'name.unique' => 'Tên này đã được sử dụng.',
            
            'email.required' => 'Email là bắt buộc.',
            'email.email' => 'Email không hợp lệ.',
            'email.unique' => 'Email này đã được sử dụng.',
            
            'password.required' => 'Mật khẩu là bắt buộc.',
            'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',

            'role.in' => 'Role không hợp lệ',

            'age.max' => 'Tuổi không được phép lớn hơn 100.',
            'age.min' => 'Tuổi tối thiểu phải là 10.',
            'age.interger' => 'Tuổi không hợp lệ',

            'phone' => 'Số điện thoại không hợp lệ',
            
        ];
    }
}
