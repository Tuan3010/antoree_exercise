<?php

if (!function_exists('apiResponse')) {
    function apiResponse($message = '', $data = null, $status = 200)
    {
        return response()->json([
            'success' => $status >= 200 && $status < 300,
            'message' => $message,
            'data' => $data
        ], $status);
    }
}