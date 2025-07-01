// src/queries.ts
import { gql } from "@apollo/client";

// Tipe untuk customer
export interface Customer {
    id: number;
    name: string;
    phone: string;
    created_at: string;
}

// Tipe untuk informasi pagination
export interface PaginatorInfo {
    count: number;
    currentPage: number;
    hasMorePages: boolean;
    lastPage: number;
    perPage: number;
    total: number;
}

// Tipe untuk hasil query
export interface GetCustomersData {
    customers: {
        data: Customer[];
        paginatorInfo: PaginatorInfo;
    };
}

// Query GraphQL dengan parameter pagination
export const GET_CUSTOMERS = gql`
    query GetCustomers(
        $first: Int!
        $search: String
        $page: Int!
        $orderBy: [OrderByClause!]
    ) {
        customers(
            first: $first
            page: $page
            orderBy: $orderBy
            search: $search
        ) {
            data {
                id
                name
                phone
                created_at
            }
            paginatorInfo {
                count
                lastPage
                currentPage
                perPage
                total
                hasMorePages
            }
        }
    }
`;
