import React from "react";
import { CPagination, CPaginationItem } from "@coreui/react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getDisplayedPages = (): (number | string)[] => {
        const pages: (number | string)[] = [];

        // Tambahkan halaman pertama
        pages.push(1);

        // Tambahkan `...` jika jarak ke halaman pertama lebih dari 2
        if (currentPage > 4) {
            pages.push("...");
        }

        // Tambahkan 3 halaman di sekitar halaman aktif
        const start = Math.max(2, currentPage - 1);
        const end = Math.min(totalPages - 1, currentPage + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Tambahkan `...` jika jarak ke halaman terakhir lebih dari 2
        if (currentPage < totalPages - 3) {
            pages.push("...");
        }

        // Tambahkan halaman terakhir
        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const displayedPages = getDisplayedPages();

    return (
        <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </CPaginationItem>

            {displayedPages.map((p, index) =>
                typeof p === "string" ? (
                    <CPaginationItem key={`ellipsis-${index}`} disabled>
                        {p}
                    </CPaginationItem>
                ) : (
                    <CPaginationItem
                        key={p}
                        active={currentPage === p}
                        onClick={() => onPageChange(p)}
                    >
                        {p}
                    </CPaginationItem>
                ),
            )}

            <CPaginationItem
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </CPaginationItem>
        </CPagination>
    );
};

export default Pagination;
