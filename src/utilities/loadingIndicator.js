import Swal from "sweetalert2";

export const showLoading = (title = 'Loading...', text = 'Please wait while we fetch the data') => {
    Swal.fire({
        title,
        text,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        },
    });
};

export const closeLoading = () => {
    Swal.close();
};