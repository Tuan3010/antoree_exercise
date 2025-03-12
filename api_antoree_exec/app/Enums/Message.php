<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Message extends Enum
{
    const SUCCESS = 'Thành công!';
    const SUCCESS_RECORD = 'Lấy bản ghi thành công!';
    const ERROR = 'Có lỗi xảy ra!';
    const NOT_FOUND = 'Không tìm thấy dữ liệu!';
    const UNAUTHORIZED = 'Bạn không có quyền truy cập!';
    const FORBIDDEN = 'Truy cập bị từ chối!';
    const VALIDATION_ERROR = 'Dữ liệu không hợp lệ!';
    const CREATED_SUCCESS = 'Tạo mới thành công!';
    const UPDATED_SUCCESS = 'Cập nhật thành công!';
    const DELETED_SUCCESS = 'Xóa thành công!';
}