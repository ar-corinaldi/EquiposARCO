import React, {useEffect, useState} from "react";
const EditField = ({ value, name, reference, handleChange }) => {
  return (
    <Editable
      text={value[name]}
      placeholder={`<Ejm: ${name}1>`}
      childRef={reference.current}
      type="input"
    >
      <input
        ref={reference.current}
        type="text"
        name={name}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300"
        placeholder="Edit"
        value={value[name]}
        onChange={handleChange}
      />
    </Editable>
  );
};

const Editable = ({
  text,
  type,
  placeholder,
  children,
  childRef,
  cell,
  ...props
}) => {
  const [isEditing, setEditing] = useState(false);

  useEffect(() => {
    if (childRef && childRef.current && isEditing === true) {
      childRef.current.focus();
    }
  }, [isEditing, childRef]);

  const handleKeyDown = (event, type) => {
    const { key } = event;
    const keys = ["Escape", "Tab"];
    const enterKey = "Enter";
    const allKeys = [...keys, enterKey];

    if (
      (type === "textarea" && keys.indexOf(key) > -1) ||
      (type !== "textarea" && allKeys.indexOf(key) > -1)
    ) {
      setEditing(false);
    }
  };

  return (
    <section {...props}>
      {isEditing ? (
        <div
          onBlur={() => setEditing(false)}
          onKeyDown={(e) => handleKeyDown(e, type)}
          style={{ height: "max-content" }}
        >
          {children}
        </div>
      ) : (
        <div
          style={{ cursor: "pointer", height: "max-content" }}
          className={`rounded py-2 px-3 text-gray-700 leading-tight whitespace-pre-wrap hover:shadow-outline editable-${type}`}
          onClick={() => setEditing(true)}
        >
          <span className={`${text ? "text-black" : "text-gray-500"}`}>
            {text}
          </span>
        </div>
      )}
    </section>
  );
};

export default EditField;