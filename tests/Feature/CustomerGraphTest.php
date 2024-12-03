<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CustomerGraphTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetAllCustomers(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            {
                customers(first: 1, page: 1) {
                    data {
                        id
                        name
                        phone
                    }
                    paginatorInfo {
                        total
                    }
                }
            }
            '
        );

        $response->assertStatus(200)->assertJson([
            "data" => [
                "customers" => [
                    "data" => [
                        [
                            "name" => "Test User",
                            "phone" => "08992847119"
                        ]
                    ],
                    "paginatorInfo" => [
                        "total" => 51
                    ]
                ]
            ]
        ]);
    }

    public function testInsertDataCustomer(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            mutation {
                createCustomer(name: "Aditya", phone: "089898989") {
                  name
                  phone
                }
              }
            '
        );

        $response->assertStatus(200)->assertJson([
            "data" => [
                "createCustomer" => [
                    "name" => "Aditya",
                    "phone" => "089898989"
                ]
            ]
        ]);
    }
}
