import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
/**
 *
 * @param {errores a renderizar, debe ser un arreglo} messages arreglo de errores ["error1","error2"]
 * @param {define si se debe cerrar o no automaticamente} autoClose false, numero o true (3000 segs)
 * @param {estado enviado del http por el servidor y lo mapea} status success: >=200, warn: >=400, error>=500
 */
function Toast(messages, autoClose = 3000, status) {
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
    if (Array.isArray(messages)) {
      return messages.map((mes) =>
        toast[status](mes, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: autoClose,
        })
      );
    } else if (typeof messages === "string") {
      return toast[status](messages, {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: autoClose,
      });
    } else {
      throw new Error("Se ha generado un error");
    }
  } catch (e) {
    return toast.error("Se ha generado un error", {
      position: toast.POSITION.BOTTOM_RIGHT,
    });
  }
}

export default Toast;
