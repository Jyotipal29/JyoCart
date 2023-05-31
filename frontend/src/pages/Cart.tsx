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
    cartDispatch({ type: "GET_CART", payload: data });
    console.log(data, "data");
  };

  useEffect(() => {
    getCart();
  }, []);

  const getCartProducts = async (cart: CartItem[]) => {
    try {
      const productPromises = cart.map(async (item) => {
        const response = await axios.get(`${api}products/find/${item.product}`);
        return response.data;
      });

      const products = await Promise.all(productPromises);
      console.log(products, "products");
      // Now you have an array of products with their details
    } catch (error) {
      console.error("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    getCartProducts(cart);
  }, [cart]);

  return (
    <div className="container   mx-auto  mt-20 space-x-2 flex flex-col sm:flex-row justify-between items-start sm:items-center ">
      <div className="w-3/4 ">
        {/* {cart.map((it) => (
          <div className="flex items-center  justify-between mb-2  px-2 border-2">
            <div>
              <img src={it.imageUrl} className="w-20 " alt="" />
            </div>
            <div>
              <p>{it.brand}</p>
              <p>{it.price}</p>
            </div>

            <div>
              <button
                className="bg-green-500  px-2 text-white"
                onClick={() => dispatch({ type: "INC_QTY", payload: it })}
              >
                +
              </button>
              <span>{it.qty}</span>
              <button
                disabled={it.qty === 1}
                className={`bg-green-500  px-2 text-white ${
                  it.qty === 1 ? "bg-gray-400" : "bg-green-500"
                }`}
                onClick={() => dispatch({ type: "DEC_QTY", payload: it })}
              >
                -
              </button>
            </div>
            <button
              className="text-green-500"
              onClick={() => {
                console.log(it, "removed");
                dispatch({ type: "REMOVE_FROM_CART", payload: it });
              }}
            >
              remove
            </button>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default Cart;
