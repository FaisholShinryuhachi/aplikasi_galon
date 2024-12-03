<?php

use App\Http\Controllers\CustomerController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::prefix('api')->group(function () {
    Route::get('/customers', [CustomerController::class, 'getAllCustomers']);
    Route::get('/customers/{name}', [CustomerController::class, 'getCustomer']);
});
