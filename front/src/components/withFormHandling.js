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
    try {
      const res = await fetch(formAction, options);
      const objeto = await res.json();
      if (!res.ok) {
        console.log("res", res);
        Toast(objeto, false, res.status);
        return objeto;
      } else {
        console.log("res", res);
        const message = "Registro exitoso";
        Toast(message, true, res.status);
        return objeto;
      }
    } catch (e) {
      Toast(["Error del sistema"], true, 500);
      return undefined;
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
