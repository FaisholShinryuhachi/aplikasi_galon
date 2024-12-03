<?php

namespace App\GraphQL\Queries;

use App\Models\Customer;
use Illuminate\Pagination\LengthAwarePaginator;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;
use GraphQL\Type\Definition\ResolveInfo;

class CustomerResolver
{
    /**
     * Custom resolver for fetching customers with orderBy and pagination.
     *
     * @param  mixed  $root
     * @param  array  $args
     * @param  GraphQLContext  $context
     * @param  ResolveInfo  $resolveInfo
     * @return LengthAwarePaginator
     */
    public function resolve($root, array $args, GraphQLContext $context, ResolveInfo $resolveInfo)
    {
        // Query base untuk Customer
        $query = Customer::query();

        if (isset($args['search'])) {
            $search = $args['search'];
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', '%' . $search . '%')
                    ->orWhere('phone', 'like', '%' . $search . '%');
            });
        }

        // Menambahkan 'orderBy' jika ada
        if (isset($args['orderBy'])) {
            foreach ($args['orderBy'] as $orderBy) {
                $query->orderBy($orderBy['column'], $orderBy['order']);
            }
        }

        // Pagination
        $perPage = $args['first'] ?? 10; // Default 10 data per halaman
        $page = $args['page'] ?? 1;

        // Lakukan query dan paginasi
        $customers = $query->paginate($perPage, ['*'], 'page', $page);

        // Bagian search 

        // Return data dalam bentuk CustomerConnection
        return [
            'data' => $customers->items(), // Data customers
            'paginatorInfo' => [
                'total' => $customers->total(),
                'currentPage' => $customers->currentPage(),
                'lastPage' => $customers->lastPage(),
                'perPage' => $customers->perPage(),
                'count' => count($customers->items()), // Dapatkan jumlah item pada halaman saat ini
                'hasMorePages' => $customers->hasMorePages()
            ],
        ];
    }
}
