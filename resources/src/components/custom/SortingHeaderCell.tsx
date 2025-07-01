import React from "react";
import { CTableHeaderCell } from "@coreui/react";
import CIcon from "@coreui/icons-react";

// Props untuk komponen
interface SortingHeaderCellProps {
    column: string; // Kolom yang dikendalikan
    sortColumn: string; // Kolom yang sedang diurutkan
    sortOrder: "ASC" | "DESC"; // Arah pengurutan
    onSort: (column: string) => void; // Fungsi untuk mengubah sorting
    label: string; // Label yang ditampilkan di header
    width?: string; // Lebar kolom (opsional)
    icons?: {
        default: any; // Ikon default
        ascending: any; // Ikon untuk ASC
        descending: any; // Ikon untuk DESC
    };
}

const SortingHeaderCell: React.FC<SortingHeaderCellProps> = ({
    column,
    sortColumn,
    sortOrder,
    onSort,
    label,
    width = "200px",
    icons = {
        default: null,
        ascending: null,
        descending: null,
    },
}) => {
    const isActive = sortColumn === column; // Apakah kolom ini sedang diurutkan
    const icon =
        isActive && sortOrder === "ASC"
            ? icons.ascending
            : isActive && sortOrder === "DESC"
              ? icons.descending
              : icons.default;

    return (
        <CTableHeaderCell
            style={{
                width,
                cursor: "pointer",
                position: "relative",
            }}
            onClick={() => onSort(column)} // Panggil handler sorting
        >
            {label}
            {icon && (
                <CIcon
                    icon={icon}
                    style={{
                        position: "absolute",
                        right: "20px",
                    }}
                />
            )}
        </CTableHeaderCell>
    );
};

export default SortingHeaderCell;
