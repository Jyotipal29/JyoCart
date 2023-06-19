import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/cartContext/cartContext";
import { api } from "../api/api";
import axios from "axios";
import { useUser } from "../context/userContext/userContext";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  const {
    userState: { user },
  } = useUser();
  const {
    cartState: { cart },
    cartDispatch,
  } = useCart();

  const getCartCount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}cart/count`, config);
    setCartCount(data.count);
  };

  useEffect(() => {
    getCartCount();
  }, [cart]);

  const getCart = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}cart/`, config);
    cartDispatch({ type: "GET_CART", payload: data.items });
    setLoading(false);
    console.log(data.items, "data");
  };

  useEffect(() => {
    getCart();
  }, []);

  console.log(cart, "cart");

  const removeFromCart = async (productId: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`${api}cart/`, { productId }, config);
      cartDispatch({ type: "REMOVE_FROM_CART", payload: productId });
      toast.success("product removed from cart");
      console.log(data, " deleted data");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce((total, item) => {
          const itemPrice = item.product.price * item.product.qty;
          return total + itemPrice;
        }, 0)
      );
    }
  }, [cart]);

  return (
    <div className="mt-20">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="mt-32 flex items-center justify-center ">
            {cart.length === 0 && (
              <div className="flex flex-col  items-center space-y-4">
                <h1 className="text-2xl uppercase font-lora font-bold">
                  your cart is empty
                </h1>
                <button className="bg-yellow-400 w-32 py-2 uppercase text-white text-lg font-lora rounded-md">
                  <Link to="/products">shop here</Link>
                </button>
              </div>
            )}
          </div>
          <div className="  container mx-auto px-2 mt-5 flex flex-col md:flex-row   md:justify-between w-full">
            <div className=" md:w-1/2  ">
              {cart.map(({ product }) => (
                <div className="bg-gray-100 px-4 py-4 mb-3 rounded-md">
                  <div className="flex justify-between items-center gap-3">
                    <Link to={`/product/${product._id}`}>
                      <img
                        src={product.imageUrl}
                        className="w-40 h-40 rounded-md"
                        alt=""
                      />
                    </Link>
                    <div className="flex flex-col justify-start items-start space-y-2">
                      <p className="text-xl uppercase font-semibold font-lora">
                        {product.brand}
                      </p>
                      <p className="text-xl font-lora">
                        {" "}
                        Rs. {product.price * product.qty}
                      </p>
                      <div className="bg-white w-24 flex items-center justify-between  px-2">
                        <button
                          className="text-yellow-400 text-2xl font-lora"
                          onClick={() =>
                            cartDispatch({
                              type: "INC_QTY",
                              payload: product._id,
                            })
                          }
                        >
                          +
                        </button>
                        <span className="font-lora text-xl">{product.qty}</span>
                        <button
                          disabled={product.qty === 1}
                          className={` font-lora text-2xl font-bold  ${
                            product.qty === 1
                              ? "text-gray-400"
                              : "text-yellow-400"
                          }`}
                          onClick={() =>
                            cartDispatch({
                              type: "DEC_QTY",
                              payload: product._id,
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                    </div>
                    <button
                      className="bg-yellow-400 uppercase text-white w-24 py-1 font-lora"
                      onClick={() => removeFromCart(product._id)}
                    >
                      remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {cartCount > 0 && (
              <div className=" md:w-1/3  border-2   flex flex-col px-8 space-y-4 h-full rounded-md ">
                <div className="flex flex-col justify-center items-center mt-2">
                  <h1 className="text-xl font-bold uppercase font-lora">
                    Details
                  </h1>
                  <p className="text-lg font-semibold font-lora">
                    {cartCount} items
                  </p>
                </div>

                <span className="border-2 border-gray-300"></span>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold font-lora">Total price</p>
                  <p className="font-semibold"> Rs. {total}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-lg font-semibold font-lora text-yellow-300">
                    Discount
                  </p>
                  <p className="font-semibold font-lora text-yellow-300">
                    {" "}
                    Rs. 350
                  </p>
                </div>
                <span className="border-2 border-gray-300"></span>

                <div className="flex justify-between">
                  <p className="text-lg font-bold font-lora ">subtotal</p>
                  <p className="font-semibold font-lora">Rs {total - 350}</p>
                </div>
                <button
                  className="bg-yellow-400 uppercase text-xl font-bold text-white  py-1 font-lora "
                  onClick={() => navigate("/checkout")}
                >
                  checkout
                </button>
                <p className="mt-2"></p>
              </div>
            )}

            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
