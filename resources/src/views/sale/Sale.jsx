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
    CDropdown,
    CDropdownItem,
    CDropdownMenu,
    CDropdownToggle,
    CListGroupItem,
    CListGroup,
    CForm,
    CButton,
} from "@coreui/react";

const Sale = () => {
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

            <CCol xs={12}>
                <CCard className="mb-4">
                    <CCardHeader>
                        <strong>Add Customer</strong>
                    </CCardHeader>
                    <CCardBody>
                        {/* <CForm onSubmit={handleSubmit}>
                            <div style={{ position: "relative" }}>
                                <CFormInput
                                    type="text"
                                    value={query}
                                    onChange={handleChange}
                                    placeholder="Search user..."
                                    className="mb-3"
                                />
                                {loading && <p>Loading...</p>}
                                {error && (
                                    <p style={{ color: "red" }}>{error}</p>
                                )}
                                {suggestions.length > 0 && (
                                    <CDropdown className="w-100">
                                        <CDropdownToggle
                                            color="light"
                                            caret={false}
                                            className="w-100"
                                        >
                                            Suggestions
                                        </CDropdownToggle>
                                        <CDropdownMenu
                                            className="w-100"
                                            style={{
                                                maxHeight: "200px",
                                                overflowY: "auto",
                                            }}
                                        >
                                            {suggestions.map((suggestion) => (
                                                <CDropdownItem
                                                    key={suggestion.id}
                                                    onClick={() =>
                                                        handleSelect(suggestion)
                                                    }
                                                >
                                                    {suggestion.name}
                                                </CDropdownItem>
                                            ))}
                                        </CDropdownMenu>
                                    </CDropdown>
                                )}
                            </div>
                            <CButton
                                type="submit"
                                color="primary"
                                className="mt-3"
                                disabled={!selectedUser} // Tombol nonaktif jika user belum dipilih
                            >
                                Assign User
                            </CButton>
                        </CForm> */}
                        <CForm onSubmit={handleSubmit}>
                            <div style={{ position: "relative" }}>
                                <CFormInput
                                    type="text"
                                    value={query}
                                    onChange={handleChange}
                                    placeholder="Search user..."
                                    className="mb-3"
                                />
                                {loading && <p>Loading...</p>}
                                {error && (
                                    <p style={{ color: "red" }}>{error}</p>
                                )}
                                {suggestions.length > 0 && (
                                    <CListGroup
                                        className="w-100"
                                        style={{
                                            maxHeight: "200px",
                                            overflowY: "auto",
                                            position: "absolute",
                                            zIndex: 1000,
                                            background: "white",
                                            boxShadow:
                                                "0 4px 8px rgba(0, 0, 0, 0.1)",
                                        }}
                                    >
                                        {suggestions.map((suggestion) => (
                                            <CListGroupItem
                                                key={suggestion.id}
                                                action
                                                onClick={() =>
                                                    handleSelect(suggestion)
                                                }
                                                style={{ cursor: "pointer" }}
                                            >
                                                {suggestion.name}
                                            </CListGroupItem>
                                        ))}
                                    </CListGroup>
                                )}
                            </div>
                            <CButton
                                type="submit"
                                color="primary"
                                className="mt-3"
                                disabled={!selectedUser} // Tombol nonaktif jika user belum dipilih
                            >
                                Assign User
                            </CButton>
                        </CForm>
                    </CCardBody>
                </CCard>
            </CCol>
        </CRow>
    );
};

export default Sale;
