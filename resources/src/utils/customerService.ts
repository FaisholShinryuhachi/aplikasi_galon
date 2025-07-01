export const handleCreateCustomer = (
    setToast: (toast: {
        visible: boolean;
        message: string;
        type: "success" | "error";
    }) => void,
    setName: (name: string) => void,
    setPhone: (phone: string) => void,
) => ({
    onCompleted: () => {
        setToast({
            visible: true,
            message: "Customer berhasil ditambahkan!",
            type: "success",
        });
        setName("");
        setPhone("");
    },
    onError: (error: any) => {
        setToast({
            visible: true,
            message: `Terjadi kesalahan: ${error.message}`,
            type: "error",
        });
    },
    refetchQueries: ["GET_CUSTOMERS"], // Refresh data
});
