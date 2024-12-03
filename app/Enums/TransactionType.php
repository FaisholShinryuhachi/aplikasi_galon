<?php

namespace App\Enums;

enum TransactionType: string
{
    case RESTOCK = 'RESTOCK';
    case SALE = 'SALE';
}
