import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/cartContext/cartContext";
import { api } from "../api/api";
import axios from "axios";
import { useUser } from "../context/userContext/userContext";
import Loader from "../components/Loader";
import { Link } from "react-router-dom";
const Cart = () => {
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
    <>
      <div className="mt-20 bg-yellow-400 py-3 ">
        <h1 className="text-white text-2xl uppercase text-center font-bold">
          your cart
        </h1>
      </div>

      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="  container mx-auto px-2 mt-5 flex flex-col md:flex-row   md:justify-between w-full">
          <div className=" md:w-1/2  ">
            {cart.map(({ product }) => (
              <div className="flex items-center  justify-between mb-2 px-3 border-2">
                <div className="flex py-2 ">
                  <Link to={`/product/${product._id}`}>
                    <img src={product.imageUrl} className="w-20 " alt="" />
                  </Link>
                  <div className="space-y-2">
                    <p className="text-xl uppercase font-semibold">
                      {product.brand}
                    </p>
                    <p className="text-xl">{product.price * product.qty}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    className="bg-yellow-500  px-2 text-white"
                    onClick={() =>
                      cartDispatch({ type: "INC_QTY", payload: product._id })
                    }
                  >
                    +
                  </button>
                  <span>{product.qty}</span>
                  <button
                    disabled={product.qty === 1}
                    className={`bg-yellow-500  px-2 text-white ${
                      product.qty === 1 ? "bg-gray-400" : "bg-yellow-500"
                    }`}
                    onClick={() =>
                      cartDispatch({ type: "DEC_QTY", payload: product._id })
                    }
                  >
                    -
                  </button>
                </div>
                <button
                  className="bg-yellow-400 uppercase text-white py-1 px-5 rounded-md"
                  onClick={() => removeFromCart(product._id)}
                >
                  remove
                </button>
              </div>
            ))}
          </div>
          {cartCount > 0 && (
            <div className=" md:w-1/3  border-2   flex flex-col px-8 space-y-4 h-full ">
              <div className="flex flex-col justify-center items-center mt-2">
                <h1 className="text-xl font-bold uppercase">Details</h1>
                <p className="text-lg font-semibold">{cartCount} items</p>
              </div>

              <span className="border-2 border-gray-300"></span>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Total price</p>
                <p className="font-semibold"> Rs. {total}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-lg font-semibold">Discount</p>
                <p className="font-semibold"> Rs. 350</p>
              </div>
              <span className="border-2 border-gray-300"></span>

              <div className="flex justify-between">
                <p className="text-lg font-bold ">subtotal</p>
                <p className="font-semibold">Rs {total - 350}</p>
              </div>
              <button className="bg-yellow-400 uppercase text-xl font-bold text-white rounded-md py-1 ">
                checkout
              </button>
              <p className="mt-2"></p>
            </div>
          )}

          <ToastContainer />
        </div>
      )}
    </>
  );
};

export default Cart;
