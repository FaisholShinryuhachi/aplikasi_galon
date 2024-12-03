<?php

namespace Tests\Feature;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class StockTransactionGraphTest extends TestCase
{
    /**
     * A basic feature test example.
     */
    public function testGetAllStockTransaction(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            {
                stockTransactions(first: 10, page: 1) {
                  data {
                    id
                    amount
                    created_at
                    updated_at
                  }
                  paginatorInfo {
                    total
                  }
                }
              }
                '
        );

        $response->assertStatus(200)->assertSeeText('id')->assertSeeText('amount');

        $this->testDateEquals($response, 'data.stockTransactions.data.0.created_at');
        $this->testDateEquals($response, 'data.stockTransactions.data.0.updated_at');
        $this->assertEquals($response->json('data.stockTransactions.paginatorInfo.total'), 10);
    }

    public function testCreateStockTransaction(): void
    {
        $response = $this->graphQL(
            /** @lang GraphQL */
            '
            mutation {
                createStockTransaction(amount: 5) {
                  id
                  amount
                  created_at
                  updated_at
                }
              }
                '
        );

        $this->testDateEquals($response, 'data.createStockTransaction.created_at');
        $this->testDateEquals($response, 'data.createStockTransaction.updated_at');

        $response->assertStatus(200)
            ->assertSeeText('id')
            ->assertSeeText('amount')
            ->assertSeeText('created_at')
        ;
    }
}
