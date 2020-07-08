import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();
function Toast(props) {
  const { errors } = props;

  return errors.map((err) =>
    toast.warn(err, {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: false,
    })
  );
}

export default Toast;
