import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Toast(errors, autoClose, status) {
  // let { errors, noAutoClose, status } = props;
  if (status) {
    status =
      status >= 400 && status < 500
        ? "warn"
        : status >= 500
        ? "error"
        : "success";
  }
  status = status || "warn";
  try {
    return errors.map((err) =>
      toast[status](err, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: autoClose ? undefined : false,
      })
    );
  } catch (e) {
    return toast[status]("Se ha generado un error", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
}

export default Toast;
