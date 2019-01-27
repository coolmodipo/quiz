<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class EmailController extends Controller
{
    public function index()
    {
        return response()->json('Email successfully sent.', 200);
    }
}
