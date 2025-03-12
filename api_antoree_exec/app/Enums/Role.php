<?php

namespace App\Enums;

use BenSampo\Enum\Enum;

final class Role extends Enum
{
    const ADMIN = 'admin';
    const USER = 'user';
    const SUPPERADMIN = 'supper_admin';
}