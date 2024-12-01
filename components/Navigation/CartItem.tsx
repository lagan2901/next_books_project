"use client"

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const CartItem = ({ item, onIncrease }) => {
  const { title, cover, quantity, price } = item;

  return (
    <div style={styles.card}>
      <img src={cover} alt={title} style={styles.image} />
      <div style={styles.details}>
        <p style={styles.title}>{title}</p>
        <div style={styles.quantity}>
          <span>{quantity}</span>
          <button onClick={() => onIncrease(item)} style={styles.plusButton}>
            +
          </button>
        </div>
      </div>
      <div style={styles.price}>
        <p>{`$${(price * quantity).toFixed(2)}`}</p>
      </div>
    </div>
  );
};

const styles = {
  card: {
    display: "flex",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  image: {
    width: "80px",
    height: "80px",
    marginRight: "20px",
  },
  details: {
    flex: 1,
  },
  title: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "5px",
  },
  quantity: {
    display: "flex",
    alignItems: "center",
  },
  plusButton: {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
    fontSize: "20px",
    marginLeft: "5px",
    padding: "0",
    color: "#007bff",
  },
  price: {
    marginLeft: "auto",
    fontSize: "18px",
    fontWeight: "bold",
  },
};

export default CartItem;
