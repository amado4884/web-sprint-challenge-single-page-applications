import React, { useState } from "react";
import * as Yup from "yup";

const TextBox = ({ name, placeholder, type, onChange, schema }) => {
  const [errors, setErrors] = useState([]);
  const [value, setValue] = useState("");
  const inputChanged = (e) => {
    e.persist();
    Yup.reach(schema, name)
      .validate(e.target.value)
      .then((valid) => {
        setErrors([]);
      })
      .catch((err) => {
        setErrors(err.errors);
      });
    setValue(e.target.value);
  };

  return (
    <div>
      {type === "textarea" ? (
        <textarea name={name} value={value} placeholder={placeholder} onChange={inputChanged}></textarea>
      ) : (
        <input name={name} value={value} placeholder={placeholder} onChange={inputChanged} />
      )}
      {errors.map((error) => (
        <p className="error">{error}</p>
      ))}
    </div>
  );
};
export default TextBox;
