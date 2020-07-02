import React, { useState } from "react";
const withFormHandling = (FormComponent) => (props) => {
  const [fields, setFields] = useState({ ...props.fields });
  const { formAction } = props;
  // const [errors] = useState({ ...props.errors });

  const handleChange = (e) => {
    const target = e.target;
    let value = target.type === "checkbox" ? target.checked : target.value;
    let name = target.name;
    const newFields = { ...fields };
    // errors = { ...errors };
    // const error = (newFields[name] = value); //create a validation function that returns an error based on field name and value
    // errors[name] = error;
    // setState({ fields, errors });
    newFields[name] = value;
    setFields(newFields);
  };

  const handleSubmitPOST = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      body: JSON.stringify(fields),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(formAction, options);
  };

  const handleSubmitGET = (e) => {
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