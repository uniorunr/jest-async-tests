import Toastify from "toastify-js";

export function queryResultMessage(message, color) {
    const validateToast = Toastify({
        text: `${message}`,
        close: true,
        gravity: 'top',
        position: 'right',
        backgroundColor: color,
    });
    validateToast.showToast();
}