import React, { useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormFloating,
    CFormInput,
    CFormLabel,
} from "@coreui/react";
import { useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GetCustomersData } from "../../queries/GetCustomer";
import TablePlaceholder from "../../components/custom/TablePlaceholder";
import Pagination from "../../components/custom/Pagination";
import { format } from "date-fns";

const Customer = () => {
    const [page, setPage] = useState(1);
    const perPage = 10; // Menampilkan 5 data per halaman
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState("name"); // Default sort by 'name'
    const [sortOrder, setSortOrder] = useState("ASC");

    const { loading, error, data } = useQuery<GetCustomersData>(GET_CUSTOMERS, {
        variables: {
            first: perPage,
            page,
            search,
            orderBy: [{ column: sortColumn, order: sortOrder }],
        },
    });

    const paginatorInfo = data?.customers.paginatorInfo;
    const totalCustomers = paginatorInfo?.total || 0;
    const totalPages = paginatorInfo?.lastPage || 0;

    const handlePageChange = (newPage: number) => {
        setPage(newPage); // Set halaman baru
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value); // Update state pencarian saat input berubah
    };

    const handleSort = (column: string) => {
        // Toggle the sorting order
        if (sortColumn === column) {
            setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
        } else {
            setSortColumn(column);
            setSortOrder("ASC");
        }
    };

    return (
        <CRow>
            <CCol xs={8}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Customer</strong>
                    </CCardHeader>
                    <CCardBody style={{ minHeight: "500px" }}>
                        {/* Form Pencarian */}
                        <CFormFloating className="mb-3">
                            <CFormInput
                                type="text"
                                id="search"
                                placeholder="Search by name"
                                value={search}
                                onChange={handleSearchChange} // Menghubungkan pencarian dengan state
                            />
                            <CFormLabel htmlFor="search">Search</CFormLabel>
                        </CFormFloating>
                        {/* Table */}
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell style={{ width: "50px" }}>
                                        #
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        style={{
                                            width: "200px",
                                            cursor: "pointer",
                                        }}
                                        onClick={() => handleSort("name")}
                                    >
                                        Name
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        style={{ width: "150px" }}
                                    >
                                        Phone
                                    </CTableHeaderCell>
                                    <CTableHeaderCell
                                        style={{ width: "150px" }}
                                    >
                                        Created At
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {loading && (
                                    <TablePlaceholder row={perPage} col={4} />
                                )}
                                {data?.customers.data.map((customer, index) => (
                                    <CTableRow key={index}>
                                        <CTableHeaderCell scope="row">
                                            {index + 1 + (page - 1) * perPage}
                                        </CTableHeaderCell>
                                        <CTableDataCell>
                                            {customer.name}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {customer.phone}
                                        </CTableDataCell>
                                        <CTableDataCell>
                                            {format(
                                                customer.created_at,
                                                "EEEE, dd MMM yyyy, HH:MM",
                                            )}
                                        </CTableDataCell>
                                    </CTableRow>
                                ))}
                            </CTableBody>
                        </CTable>
                    </CCardBody>

                    {/* Pagination */}
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </CCard>
            </CCol>
            <CCol xs={4}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Customer</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CFormFloating className="mb-3">
                            <CFormInput
                                type="text"
                                id="name"
                                placeholder="Name"
                            />
                            <CFormLabel htmlFor="name">Name</CFormLabel>
                        </CFormFloating>
                        <CFormFloating>
                            <CFormInput
                                type="text"
                                id="phone"
                                placeholder="Phone"
                            />
                            <CFormLabel htmlFor="phone">Phone</CFormLabel>
                        </CFormFloating>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Customer;
