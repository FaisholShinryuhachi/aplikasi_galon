<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CustomerController extends Controller
{
    public function getAllCustomers(): JsonResponse
    {
        $customer = Customer::all();

        return Response()->json(["data" => $customer]);
    }

    public function getCustomer($name): JsonResponse
    {

        $customer = Customer::where('name', 'like', "%$name%")->get();

        return Response()->json(["data" => $customer]);
    }
}
