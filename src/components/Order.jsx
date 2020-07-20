import React from "react";

const Order = ({ order }) => {
  return (
    <div className="order">
      <div>
        <label htmlFor="">Id:</label>
        <span data-cy="order-id">{order.id}</span>
      </div>
      <div>
        <label htmlFor="">Date Created:</label>
        <span data-cy="order-created">{order.createdAt}</span>
      </div>
      <div>
        <label htmlFor="">Name:</label>
        <span data-cy="order-name">{order.name}</span>
      </div>
      <div>
        <label htmlFor="">Phone Number:</label>
        <span data-cy="order-phone">{order.phone}</span>
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <span data-cy="order-email">{order.email}</span>
      </div>
      <div>
        <label htmlFor="">Size:</label>
        <span data-cy="order-size">{order.size}</span>
      </div>
      <div>
        <label htmlFor="">Toppings:</label>
        <span data-cy="order-toppings">
          {order.toppings.map((topping, i) => `${topping}${i === order.toppings.length - 1 ? `` : ", "}`)}
        </span>
      </div>
      <div>
        <label htmlFor="">Special Instructions:</label>
        <span data-cy="order-specialInstructions">{order.specialInstructions}</span>
      </div>
    </div>
  );
};

export default Order;
