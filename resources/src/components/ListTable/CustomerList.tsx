// src/components/CustomerList.tsx
import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GetCustomersData } from "../../queries/GetCustomer";

const CustomerList: React.FC = () => {
    const [page, setPage] = useState(1);
    const perPage = 5; // Menampilkan 5 data per halaman
    const [search, setSearch] = useState(""); // State untuk pencarian

    // Menggunakan useQuery dengan variabel untuk pagination
    const { loading, error, data } = useQuery<GetCustomersData>(GET_CUSTOMERS, {
        variables: {
            search,
            first: perPage,
            page,
            orderBy: [{ column: "name", order: "ASC" }],
        },
    });

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const paginatorInfo = data?.customers.paginatorInfo;
    const totalCustomers = paginatorInfo?.total || 0;
    const totalPages = paginatorInfo?.lastPage || 0;

    return (
        <div>
            <h2>Customer List</h2>
            <ul>
                {data?.customers.data.map((customer, index) => (
                    <li key={index}>
                        {customer.name} - {customer.phone}
                    </li>
                ))}
            </ul>

            {/* Pagination Controls */}
            <div>
                <button
                    onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span>
                    {" "}
                    Page {page} of {totalPages}{" "}
                </span>
                <button
                    onClick={() =>
                        setPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={!paginatorInfo?.hasMorePages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default CustomerList;
