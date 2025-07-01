import { useMutation } from "@apollo/client";
import { UPDATE_CUSTOMER } from "../mutation/UpdateCustomer";

interface ToastOptions {
    visible: boolean;
    message: string;
    type: "success" | "error";
}

export const useUpdateCustomer = (
    setToast: (toast: ToastOptions) => void,
    setVisible: (visible: boolean) => void,
) => {
    const [updateCustomer] = useMutation(UPDATE_CUSTOMER, {
        onCompleted: () => {
            setToast({
                visible: true,
                message: "Customer berhasil diperbarui!",
                type: "success",
            });
            setVisible(false); // Tutup modal
        },
        onError: (error) => {
            setToast({
                visible: true,
                message: `Terjadi kesalahan: ${error.message}`,
                type: "error",
            });
        },
    });

    return updateCustomer;
};
