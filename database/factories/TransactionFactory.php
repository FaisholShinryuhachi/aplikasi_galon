<?php

namespace Database\Factories;

use App\Enums\TransactionType;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'customer_id' => DB::table('customers')->inRandomOrder()->first()->id,
            'product_id' => DB::table('products')->inRandomOrder()->first()->id,
            'amount' => fake()->numberBetween(1, 9),
            // 'type' => fake()->randomElement(TransactionType::cases()),
            // 'price' => Price::inRandomOrder()->first()->price,
            'price' => DB::table('prices')->inRandomOrder()->first()->price,
        ];
    }
}
