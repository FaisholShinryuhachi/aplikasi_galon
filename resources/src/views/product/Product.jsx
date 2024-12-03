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

const Product = () => {
    // const [query, setQuery] = useState(""); // Input pencarian
    const [query, setQuery] = useState(""); // Input pencarian
    const [suggestions, setSuggestions] = useState([]); // Rekomendasi dari API
    const [selectedUser, setSelectedUser] = useState(null); // User yang dipilih
    const [loading, setLoading] = useState(false); // Status loading
    const [error, setError] = useState(""); // Error handling

    const handleSearch = async (searchQuery) => {
        if (!searchQuery) {
            setSuggestions([]);
            return;
        }
        setLoading(true);
        setError("");
        try {
            const response = await fetch(`/api/customers/${searchQuery}`);
            if (!response.ok) {
                throw new Error("Failed to fetch suggestions");
            }
            const data = await response.json();
            setSuggestions(data.data);
            // console.log(suggestions);
        } catch (err) {
            setError(err.message);
            setSuggestions([]);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const value = e.target.value;
        setQuery(value);
        handleSearch(value); // Panggil API saat input berubah
        setSelectedUser(null); // Reset pilihan jika input berubah
    };

    const handleSelect = (user) => {
        setQuery(user.name); // Update input dengan nama user yang dipilih
        setSelectedUser(user); // Simpan user yang dipilih
        setSuggestions([]); // Hapus rekomendasi
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!selectedUser) {
            alert("Please select a valid user from the suggestions.");
            return;
        }
        console.log("User assigned:", selectedUser);
        // Kirim data user yang dipilih untuk di-assign ke produk
    };

    console.log(suggestions);

    return (
        <CRow>
            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>List Customer</strong>
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
            <CCol xs={12}>
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

            <div style={{ width: "300px", margin: "0 auto" }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ position: "relative" }}>
                        <input
                            type="text"
                            value={query}
                            onChange={handleChange}
                            placeholder="Search user..."
                            style={{
                                width: "100%",
                                padding: "8px",
                                boxSizing: "border-box",
                            }}
                        />
                        {loading && (
                            <p style={{ position: "absolute", top: "35px" }}>
                                Loading...
                            </p>
                        )}
                        {error && (
                            <p
                                style={{
                                    color: "red",
                                    position: "absolute",
                                    top: "35px",
                                }}
                            >
                                {error}
                            </p>
                        )}
                        {suggestions.length > 0 && (
                            <ul
                                style={{
                                    listStyleType: "none",
                                    margin: 0,
                                    padding: "8px",
                                    border: "1px solid #ccc",
                                    borderRadius: "4px",
                                    position: "absolute",
                                    top: "35px",
                                    left: 0,
                                    width: "100%",
                                    background: "#fff",
                                    zIndex: 1000,
                                }}
                            >
                                {suggestions.map((suggestion) => (
                                    <li
                                        key={suggestion.id}
                                        onClick={() => handleSelect(suggestion)}
                                        style={{
                                            padding: "8px",
                                            cursor: "pointer",
                                            borderBottom: "1px solid #eee",
                                        }}
                                    >
                                        {suggestion.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {suggestions.length > 0 && <p>test</p>}
                    </div>
                    <button
                        type="submit"
                        style={{ marginTop: "10px" }}
                        disabled={!selectedUser} // Disable tombol jika user belum dipilih
                    >
                        Assign User
                    </button>
                </form>
            </div>
        </CRow>
    );
};

export default Product;
