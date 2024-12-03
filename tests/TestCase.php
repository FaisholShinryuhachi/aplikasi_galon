<?php

namespace Tests;

use Carbon\Carbon;
use Illuminate\Foundation\Testing\TestCase as BaseTestCase;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Nuwave\Lighthouse\Testing\MakesGraphQLRequests;
use Nuwave\Lighthouse\Testing\RefreshesSchemaCache;
use Database\Seeders\CustomerSeeder;


abstract class TestCase extends BaseTestCase
{
    // Clear database before test
    use RefreshDatabase;
    // Injection graphql method
    use MakesGraphQLRequests;
    // Enabling the schema cache speeds up your tests
    use RefreshesSchemaCache;

    protected static $dateNow;

    protected function setUp(): void
    {
        parent::setUp();
        // Seeding data customer
        $this->seed();
        $this::$dateNow = Carbon::now();
    }

    protected function testDateEquals($res, $path): void
    {
        $data = $res->json($path);
        $actualDate = $data ? Carbon::parse($data)->toDateString() : null;

        // dd($actualDate);

        $this->assertEquals($actualDate, $this::$dateNow->toDateString());
    }
}
