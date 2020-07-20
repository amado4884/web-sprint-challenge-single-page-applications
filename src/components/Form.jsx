import React, { useState, useEffect } from "react";
import * as Yup from "yup";

const formSchema = Yup.object().shape({
  name: Yup.string().min(2, "Must be at least 2 characters.").required("Must include a name."),
  phone: Yup.string().length(10, "Must be at least exactly 10 characters").required("Must include a Phone Number."),
  email: Yup.string().email("Must be a valid email address.").required("Must include email address."),
  size: Yup.string()
    .required("Size is required")
    .oneOf(["Small", "Medium", "Large", "Extra Large"], "Size can only be: Small, Medium, Large, Extra Large."),
  specialInstructions: Yup.string(),
  pepperoni: Yup.boolean().oneOf([true, false], "This field can only be checked or unchecked (true or false)"),
  ham: Yup.boolean().oneOf([true, false], "This field can only be checked or unchecked (true or false)"),
  pineapple: Yup.boolean().oneOf([true, false], "This field can only be checked or unchecked (true or false)"),
  mushrooms: Yup.boolean().oneOf([true, false], "This field can only be checked or unchecked (true or false)"),
});

const Form = ({ submitForm }) => {
  const defaultFormState = {
    name: "",
    phone: "",
    email: "",
    size: "",
    specialInstructions: "",
    pepperoni: false,
    ham: false,
    pineapple: false,
    mushrooms: false,
  };
  const [formData, setFormData] = useState({ ...defaultFormState });

  const [errors, setErrors] = useState({ ...defaultFormState, tos: "" });

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const inputChange = (e) => {
    e.persist();

    let valueToTest = e.target.value;

    if (e.target.type === "checkbox")
      if (e.target.value === "on") valueToTest = true;
      else valueToTest = false;

    Yup.reach(formSchema, e.target.name)
      .validate(valueToTest)
      .then((valid) => {
        setErrors({
          ...errors,
          [e.target.name]: "",
        });
      })
      .catch((err) => {
        setErrors({
          ...errors,
          [e.target.name]: err.errors[0],
        });
      });

    if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: !formData[e.target.name] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, phone, email, size, specialInstructions } = formData;

    const toppings = [];

    for (const property in formData) {
      switch (property) {
        case "pepperoni":
        case "ham":
        case "mushrooms":
        case "pineapple":
          if (formData[property] === true) toppings.push(property);
          break;
        default:
          break;
      }
    }

    const data = { name, phone, email, size, specialInstructions, toppings };

    submitForm(data);
    setFormData({ ...defaultFormState });
  };

  useEffect(() => {
    formSchema.isValid(formData).then((valid) => {
      setButtonDisabled(!valid);
    });
  }, [formData]);

  return (
    <div className="adv-form">
      <h4>Order Now</h4>
      <form onSubmit={handleSubmit}>
        <input name="name" value={formData.name} placeholder="Name" onChange={inputChange} data-cy="name" />
        <span className="error" data-cy="name-error">
          {errors.name}
        </span>
        <input name="phone" value={formData.phone} placeholder="Phone Number" onChange={inputChange} data-cy="phone" />
        <span className="error" data-cy="phone-error">
          {errors.phone}
        </span>
        <input
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email"
          onChange={inputChange}
          data-cy="email"
        />
        <span className="error" data-cy="email-error">
          {errors.email}
        </span>
        <select name="size" onChange={inputChange} data-cy="size">
          <option value="">Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Extra Large">Extra Large</option>
        </select>
        <span className="error" data-cy="size-error">
          {errors.size}
        </span>
        <input
          name="specialInstructions"
          value={formData.specialInstructions}
          placeholder="Special Instructions"
          onChange={inputChange}
          data-cy="specialInstructions"
        />
        <span className="error" data-cy="specialInstructions-error">
          {errors.specialInstructions}
        </span>
        <h5>Toppings</h5>
        <div className="toppings">
          <div className="pepperoni">
            <label htmlFor="pepperoni">Pepperoni</label>
            <input
              name="pepperoni"
              type="checkbox"
              onChange={inputChange}
              checked={formData.pepperoni}
              data-cy="pepperoni"
            />
            <span className="error" data-cy="pepperoni-error">
              {errors.pepperoni}
            </span>
          </div>
          <div className="ham">
            <label htmlFor="ham">Ham</label>
            <input name="ham" type="checkbox" onChange={inputChange} checked={formData.ham} data-cy="ham" />
            <span className="error" data-cy="ham-error">
              {errors.ham}
            </span>
          </div>
          <div className="pineapple">
            <label htmlFor="pineapple">Pineapple</label>
            <input
              name="pineapple"
              type="checkbox"
              onChange={inputChange}
              checked={formData.pineapple}
              data-cy="pineapple"
            />
            <span className="error" data-cy="pineapple-error">
              {errors.pineapple}
            </span>
          </div>
          <div className="mushrooms">
            <label htmlFor="mushrooms">Mushrooms</label>
            <input
              name="mushrooms"
              type="checkbox"
              onChange={inputChange}
              checked={formData.mushrooms}
              data-cy="mushrooms"
            />
            <span className="error" data-cy="mushrooms-error">
              {errors.mushrooms}
            </span>
          </div>
        </div>
        <input type="submit" value="Add to Order" disabled={buttonDisabled} data-cy="submit" />
      </form>
    </div>
  );
};
export default Form;
