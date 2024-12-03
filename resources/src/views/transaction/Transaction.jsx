import React, { useState } from "react";
import {
    CCard,
    CCardBody,
    CCardHeader,
    CCol,
    CRow,
    CTable,
    CTableBody,
    CTableCaption,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
    CFormFloating,
    CFormInput,
    CFormLabel,
} from "@coreui/react";

const Transaction = () => {
    // const [query, setQuery] = useState(""); // Input pencarian
    const [query, setQuery] = useState(""); // Input pencarian
    const [suggestions, setSuggestions] = useState([]); // Rekomendasi dari API
    const [selectedUser, setSelectedUser] = useState(null); // User yang dipilih
    const [loading, setLoading] = useState(false); // Status loading
    const [error, setError] = useState(""); // Error handling

    console.log(suggestions);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Transaction</strong>
                    </CCardHeader>
                    <CCardBody>
                        <CTable striped>
                            <CTableHead>
                                <CTableRow>
                                    <CTableHeaderCell scope="col">
                                        #
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Class
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Heading
                                    </CTableHeaderCell>
                                    <CTableHeaderCell scope="col">
                                        Heading
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                <CTableRow>
                                    <CTableHeaderCell scope="row">
                                        1
                                    </CTableHeaderCell>
                                    <CTableDataCell>Mark</CTableDataCell>
                                    <CTableDataCell>Otto</CTableDataCell>
                                    <CTableDataCell>@mdo</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell scope="row">
                                        2
                                    </CTableHeaderCell>
                                    <CTableDataCell>Jacob</CTableDataCell>
                                    <CTableDataCell>Thornton</CTableDataCell>
                                    <CTableDataCell>@fat</CTableDataCell>
                                </CTableRow>
                                <CTableRow>
                                    <CTableHeaderCell scope="row">
                                        3
                                    </CTableHeaderCell>
                                    <CTableDataCell colSpan={2}>
                                        Larry the Bird
                                    </CTableDataCell>
                                    <CTableDataCell>@twitter</CTableDataCell>
                                </CTableRow>
                            </CTableBody>
                        </CTable>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Transaction;
