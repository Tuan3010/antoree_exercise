<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Message extends Enum
{
    const SUCCESS = 'Thành công!';
    const SUCCESS_RECORD = 'Lấy bản ghi thành công!';
    const ERROR = 'Lỗi hệ thống !';
    const NOT_FOUND = 'Không tìm thấy dữ liệu!';
    const UNAUTHORIZED = 'Bạn không có quyền truy cập!';
    const FORBIDDEN = 'Truy cập bị từ chối!';
    const VALIDATION_ERROR = 'Dữ liệu không hợp lệ!';
    const CREATED_SUCCESS = 'Tạo mới thành công!';
    const UPDATED_SUCCESS = 'Cập nhật thành công!';
    const UPDATED_ROLE = 'Vai trò của bạn không được chỉnh sửa thông tin người này !';
    const DELETED_SUCCESS = 'Xóa thành công!';
    const DELETED_FAILURE = 'Xóa thất bại!';
    const DELETED_SELF_ERROR = 'Không thể xóa chính mình!';
    const DELETED_ADMIN_ERROR = 'Không thể xóa người quản trị khác!';
    const CHANGE_ROLE = ' Admin không thể thay đổi vai trò của chính mình.';
    
}