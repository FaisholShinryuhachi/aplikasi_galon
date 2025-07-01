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
    CToast,
    CToastHeader,
    CToastBody,
    CButton,
    CToaster,
    CCardFooter,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
} from "@coreui/react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CUSTOMERS, GetCustomersData } from "../../queries/GetCustomer";
import TablePlaceholder from "../../components/custom/TablePlaceholder";
import Pagination from "../../components/custom/Pagination";
import { format } from "date-fns";
import CIcon from "@coreui/icons-react";
import {
    cilDelete,
    cilPen,
    cilSortAlphaDown,
    cilSortAlphaUp,
    cilSortNumericDown,
    cilSortNumericUp,
    cilSpeedometer,
    cilTrash,
} from "@coreui/icons";
import SortingHeaderCell from "../../components/custom/SortingHeaderCell";
import { CREATE_CUSTOMER } from "../../mutation/CreateCustomer";
import { UPDATE_CUSTOMER } from "../../mutation/UpdateCustomer";
import { handleCreateCustomer } from "../../utils/customerService";
import { useUpdateCustomer } from "../../utils/useUpdateCustomer";

const Customer = () => {
    const [page, setPage] = useState(1);
    const perPage = 10;
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState("name"); // Default sort by 'name'
    const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC");
    const [visible, setVisible] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState<{
        id: number;
        name: string;
        phone: string;
    } | null>(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");

    const [toast, setToast] = useState<{
        visible: boolean;
        message: string;
        type: "success" | "error";
    }>({
        visible: false,
        message: "",
        type: "success",
    });

    const handleEditCustomer = (customer: {
        id: number;
        name: string;
        phone: string;
    }) => {
        setCurrentCustomer(customer);
        setVisible(true);
    };

    // * --------------------
    // * Handle Get Data
    // * --------------------

    const { loading, error, data } = useQuery<GetCustomersData>(GET_CUSTOMERS, {
        variables: {
            first: perPage,
            page,
            search,
            orderBy: [{ column: sortColumn, order: sortOrder }],
        },
    });

    // * --------------------
    // * Handle Add Customer
    // * --------------------

    const [createCustomer] = useMutation(
        CREATE_CUSTOMER,
        handleCreateCustomer(setToast, setName, setPhone),
    );

    // * --------------------
    // * Handle Edit Customer
    // * --------------------
    const updateCustomer = useUpdateCustomer(setToast, setVisible);
    const handleSaveChanges = async () => {
        if (currentCustomer) {
            await updateCustomer({
                variables: {
                    id: currentCustomer.id,
                    name: currentCustomer.name,
                    phone: currentCustomer.phone,
                },
            });
        }
    };

    const showToast = (message: string, type: "success" | "error") => {
        // Tutup toast lama sebelum menampilkan yang baru
        setToast({ ...toast, visible: false });
        setTimeout(() => {
            setToast({
                visible: true,
                message,
                type,
            });
        }, 100); // Delay untuk memastikan animasi terlihat
    };
    const handleAddCustomer = async () => {
        if (name && phone) {
            try {
                await createCustomer({ variables: { name, phone } });
                showToast("Customer berhasil ditambahkan!", "success");
                setName("");
                setPhone("");
            } catch (error) {
                showToast(`Terjadi kesalahan: ${error.message}`, "error");
            }
        } else {
            showToast("Nama dan nomor telepon harus diisi!", "error");
        }
    };

    const paginatorInfo = data?.customers.paginatorInfo;
    const totalCustomers = paginatorInfo?.total || 0;
    const totalPages = paginatorInfo?.lastPage || 0;

    const handlePageChange = (newPage: number) => {
        setPage(newPage); // Set halaman baru
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value); // Update state pencarian saat input berubah
    };

    const handleSort = (column: string): void => {
        if (sortColumn === column) {
            setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
        } else {
            setSortColumn(column);
            setSortOrder("ASC");
        }
    };
    return (
        <CRow>
            <CCol xs={12}>
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
                                    <SortingHeaderCell
                                        column={"name"}
                                        sortColumn={sortColumn}
                                        sortOrder={sortOrder}
                                        onSort={handleSort}
                                        label={"Name"}
                                        icons={{
                                            default: cilSortAlphaDown,
                                            ascending: cilSortAlphaDown,
                                            descending: cilSortAlphaUp,
                                        }}
                                    ></SortingHeaderCell>
                                    <CTableHeaderCell
                                        style={{ width: "100px" }}
                                    >
                                        Phone
                                    </CTableHeaderCell>
                                    <SortingHeaderCell
                                        column={"created_at"}
                                        sortColumn={sortColumn}
                                        sortOrder={sortOrder}
                                        onSort={handleSort}
                                        label={"Crated At"}
                                        icons={{
                                            default: cilSortNumericDown,
                                            ascending: cilSortNumericDown,
                                            descending: cilSortNumericUp,
                                        }}
                                    ></SortingHeaderCell>
                                    <CTableHeaderCell
                                        style={{ width: "100px" }}
                                    >
                                        Action
                                    </CTableHeaderCell>
                                </CTableRow>
                            </CTableHead>
                            <CTableBody>
                                {loading && (
                                    <TablePlaceholder row={perPage} col={5} />
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
                                                "EE, dd MMM yyyy, HH:MM",
                                            )}
                                        </CTableDataCell>
                                        <CTableDataCell className="d-flex justify-content-around">
                                            <CButton
                                                color="primary"
                                                onClick={() =>
                                                    handleEditCustomer({
                                                        id: customer.id,
                                                        name: customer.name,
                                                        phone: customer.phone,
                                                    })
                                                }
                                            >
                                                <CIcon icon={cilPen}></CIcon>
                                            </CButton>
                                            <CButton color="danger">
                                                <CIcon icon={cilTrash}></CIcon>
                                            </CButton>
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
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            <CFormLabel htmlFor="name">Name</CFormLabel>
                        </CFormFloating>
                        <CFormFloating>
                            <CFormInput
                                type="text"
                                id="phone"
                                placeholder="Phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                            <CFormLabel htmlFor="phone">Phone</CFormLabel>
                        </CFormFloating>
                    </CCardBody>
                    <CCardFooter className="d-flex justify-content-center">
                        <CButton color="primary" onClick={handleAddCustomer}>
                            Add Customer
                        </CButton>
                    </CCardFooter>
                </CCard>
            </CCol>
            {/* Toast Notification */}
            <CToaster placement="top-end" className="position-static m-4">
                {toast.visible && (
                    <CToast
                        color={toast.type === "success" ? "primary" : "danger"}
                        animation={true}
                        autohide={true}
                        delay={5000}
                        visible={toast.visible}
                        onClose={() => setToast({ ...toast, visible: false })}
                    >
                        <CToastHeader closeButton>
                            <strong className="me-auto">
                                {toast.type === "success" ? "Success" : "Error"}
                            </strong>
                        </CToastHeader>
                        <CToastBody>{toast.message}</CToastBody>
                    </CToast>
                )}
            </CToaster>
            <CModal
                alignment="center"
                visible={visible}
                onClose={() => setVisible(false)}
                aria-labelledby="EditCustomerModal"
            >
                <CModalHeader>
                    <CModalTitle id="EditCustomerModal">
                        Edit Customer
                    </CModalTitle>
                </CModalHeader>
                <CModalBody>
                    <CFormFloating className="mb-3">
                        <CFormInput
                            type="text"
                            id="editName"
                            placeholder="Name"
                            value={currentCustomer?.name || ""}
                            onChange={(e) =>
                                setCurrentCustomer((prev) =>
                                    prev
                                        ? { ...prev, name: e.target.value }
                                        : prev,
                                )
                            }
                        />
                        <CFormLabel htmlFor="editName">Name</CFormLabel>
                    </CFormFloating>
                    <CFormFloating>
                        <CFormInput
                            type="text"
                            id="editPhone"
                            placeholder="Phone"
                            value={currentCustomer?.phone || ""}
                            onChange={(e) =>
                                setCurrentCustomer((prev) =>
                                    prev
                                        ? { ...prev, phone: e.target.value }
                                        : prev,
                                )
                            }
                        />
                        <CFormLabel htmlFor="editPhone">Phone</CFormLabel>
                    </CFormFloating>
                </CModalBody>
                <CModalFooter>
                    <CButton
                        color="secondary"
                        onClick={() => setVisible(false)}
                    >
                        Close
                    </CButton>
                    <CButton color="primary" onClick={handleSaveChanges}>
                        Save changes
                    </CButton>
                </CModalFooter>
            </CModal>
        </CRow>
    );
};

export default Customer;
