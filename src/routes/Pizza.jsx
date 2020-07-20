import React, { useState } from "react";
import axios from "axios";
import Form from "../components/Form";
import Order from "../components/Order";

const Home = () => {
  const [orders, setOrders] = useState([]);
  const submitForm = async (formData) => {
    const { data, status } = await axios.post("https://reqres.in/api/users", formData);

    if (status === 201) setOrders([...orders, data]);
    else console.log("There was an error");
  };
  return (
    <>
      <h1>Pizza Form</h1>
      <Form submitForm={submitForm} />
      {orders.map((order) => (
        <Order key={order.id} order={order} />
      ))}
    </>
  );
};
export default Home;
