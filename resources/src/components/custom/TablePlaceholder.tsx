import { CPlaceholder, CTableDataCell, CTableRow } from "@coreui/react";
import React from "react";

interface ComponentProps {
    row: number;
    col: number;
}

const TablePlaceholder: React.FC<ComponentProps> = ({ row = 0, col = 0 }) => {
    return (
        <>
            {Array.from({ length: row }).map((_, index) => (
                <CTableRow key={index}>
                    <CTableDataCell colSpan={col}>
                        <CPlaceholder
                            as="p"
                            animation="glow"
                            style={{
                                marginBottom: 0,
                            }}
                        >
                            <CPlaceholder xs={12} size="sm" />
                        </CPlaceholder>
                    </CTableDataCell>
                </CTableRow>
            ))}
        </>
    );
};

export default TablePlaceholder;
