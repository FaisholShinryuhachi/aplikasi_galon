<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class TransactionGraphTest extends TestCase
{

    public function testGetAllTransaction(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            {
                transactions(first: 10, page: 1) {
                  data {
                    id
                    customer {
                      name
                    }
                    product{
                      name
                    }
                    amount
                    price
                    created_at
                    updated_at
                  }paginatorInfo{
                    count
                    total
                  }
                }
              }
                '
        );

        $response->assertStatus(200)
            ->assertSeeText('id')
            ->assertSeeText('amount')
            ->assertSeeText('name')
            ->assertSeeText('Galon Mineral')
            ->assertSeeText('price')
            ->assertSeeText('50')
        ;

        $this->testDateEquals($response, 'data.transactions.data.0.created_at');
        $this->testDateEquals($response, 'data.transactions.data.0.updated_at');
    }

    public function testCreateTransaction(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            mutation {
                createTransaction(customer_id: 1, product_id: 1, amount: 5, price: 5000) {
                  customer {
                    name
                  }
                  amount
                  price
                }
              }
                '
        );

        $response->assertStatus(200)->assertJson([
            "data" => [
                "createTransaction" => [
                    "customer" => [
                        "name" => "Test User"
                    ],
                    "amount" => 5,
                    "price" => 5000
                ]
            ]
        ]);
    }
}
