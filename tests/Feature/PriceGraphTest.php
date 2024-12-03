<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class PriceGraphTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetAllPrice(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            {
                prices{
                    id,
                    price,
                }
            }
            '
        );

        $response->assertStatus(200)->assertJson([

            "data" => [
                "prices" => array(
                    [
                        "id" => "1",
                        "price" => 5000
                    ],
                    [
                        "id" => "2",
                        "price" => 4000
                    ]
                )
            ]

        ]);
    }

    public function testCreatePrice(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            mutation {
                createPrice(price: 6000) {
                 price
                }
              }
            '
        );

        $response->assertStatus(200)->assertJson([
            "data" => [
                "createPrice" => [
                    "price" => 6000,
                ]
            ]
        ]);
    }
}
