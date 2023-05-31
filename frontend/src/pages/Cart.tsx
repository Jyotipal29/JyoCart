import React, { useEffect, useState } from "react";
import { useCart } from "../context/cartContext/cartContext";
import { api } from "../api/api";
import axios from "axios";
import { useUser } from "../context/userContext/userContext";
const Cart = () => {
  const {
    userState: { user },
  } = useUser();
  const {
    cartState: { cart },
    cartDispatch,
  } = useCart();

  const getCart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}cart/`, config);
    cartDispatch({ type: "GET_CART", payload: data.items });
    console.log(data.items, "data");
  };

  useEffect(() => {
    getCart();
  }, []);

  console.log(cart, "cart");

  const removeFromCart = async (productId: number) => {
    console.log(productId, "id");
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`${api}cart/`, { productId }, config);
      cartDispatch({ type: "REMOVE_FROM_CART", payload: productId });
      console.log(data, " deleted data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container   mx-auto  mt-20 space-x-2 flex flex-col sm:flex-row justify-between items-start sm:items-center ">
      <div className="w-3/4 ">
        <h2>this is the cart</h2>
        {cart.map(({ product }) => (
          <div className="flex items-center  justify-between mb-2  px-2 border-2">
            <div>
              <img src={product.imageUrl} className="w-20 " alt="" />
            </div>
            <div>
              <p>{product.brand}</p>
              <p>{product.price}</p>
            </div>

            <div>
              <button className="bg-green-500  px-2 text-white">+</button>
              <span>{product.qty}</span>
              <button
                disabled={product.qty === 1}
                className={`bg-green-500  px-2 text-white ${
                  product.qty === 1 ? "bg-gray-400" : "bg-green-500"
                }`}
              >
                -
              </button>
            </div>
            <button
              className="text-green-500"
              onClick={() => removeFromCart(product._id)}
            >
              remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cart;
