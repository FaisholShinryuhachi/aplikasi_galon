<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class ProductGraphTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetProduct(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            {
                product {
                    name
                }
            }
            '
        );

        $response->assertStatus(200)->assertJson([
            "data" => [
                "product" => [
                    "name" => "Galon Mineral"
                ]
            ]
        ]);
    }
}
