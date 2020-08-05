import React, { useState } from "react";
import Toast from "./Toast";

const withFormHandling = (FormComponent) => (props) => {
  const [fields, setFields] = useState({ ...props.fields });
  const { formAction } = props;
  // const [errors] = useState({ ...props.errors });

  const handleChange = (e) => {
    const target = e.target;
    let value =
      target.type === ("checkbox" || "radio") ? target.checked : target.value;
    let name = target.name;
    const newFields = { ...fields };
    // errors = { ...errors };
    // const error = (newFields[name] = value); //create a validation function that returns an error based on field name and value
    // errors[name] = error;
    // setState({ fields, errors });
    newFields[name] = value;
    setFields(newFields);
    if (props.setFields) {
      props.setFields(newFields);
    }
  };

  /**
   * Retorna el objeto creado
   * @param e
   */
  const handleSubmitPOST = async (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    };
    let message = "Error del sistema";
    let status = 500;
    let autoClose = true;
    let objeto = undefined;
    try {
      const res = await fetch(formAction, options);
      objeto = await res.json();
      if (!res.ok) {
        autoClose = false;
        message = "Registro no exitoso";
      } else {
        message = "Registro exitoso";
      }
      status = res.status;
    } finally {
      Toast([message], autoClose, status);
      return objeto;
    }
  };

  const handleSubmitGET = (e) => {
    console.log("llegaGET");
    e.preventDefault();

    fetch(formAction);
  };

  return (
    <FormComponent
      {...props} //to access form specific props not handled by state
      fields={fields}
      // errors={errors}
      handleChange={handleChange}
      handleSubmitPOST={handleSubmitPOST}
      handleSubmitGET={handleSubmitGET}
    />
  );
};
export default withFormHandling;
