<?php

namespace Database\Seeders;

use App\Models\Price;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PriceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Price::factory()->create([
            'id' => 1,
            'price' => 5000,
        ]);

        Price::factory()->create([
            'id' => 2,
            'price' => 4000,
        ]);
    }
}
