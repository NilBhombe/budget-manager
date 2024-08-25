import { toast } from "react-toastify";

const toasts = {};

toasts.successMsg = (msg) => {
  toast.success(msg);
};

toasts.errorMsg = (msg) => {
  toast.error(msg);
};

export default toasts;
