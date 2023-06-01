import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/cartContext/cartContext";
import { api } from "../api/api";
import axios from "axios";
import { useUser } from "../context/userContext/userContext";
import Loader from "../components/Loader";
const Cart = () => {
  const [loading, setLoading] = useState(false);
  const {
    userState: { user },
  } = useUser();
  const {
    cartState: { cart },
    cartDispatch,
  } = useCart();

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

  return (
    <div className="container   mx-auto  mt-20 space-x-2 flex flex-col sm:flex-row justify-between items-start sm:items-center ">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="w-3/4 ">
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
      )}

      <ToastContainer />
    </div>
  );
};

export default Cart;
