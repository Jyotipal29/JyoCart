import { useWish } from "../context/wishContext/wishContext";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext/userContext";
import { toast, ToastContainer } from "react-toastify";
import ClipLoader from "react-spinners/ClipLoader";

import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { api } from "../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext/cartContext";
import Loader from "../components/Loader";
const Wishlist = () => {
  const [loading, setLoading] = useState(false);
  const [cartLoading, setCartLoading] = useState<{
    [productId: string]: boolean;
  }>({});
  const [wishLoading, setWishLoading] = useState<{
    [productId: string]: boolean;
  }>({});
  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();
  const {
    wishState: { wish },
    wishDispatch,
  } = useWish();
  const { cartDispatch } = useCart();

  const getWish = async () => {
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.get(`${api}wish/`, config);
      wishDispatch({ type: "GET_WISH", payload: data.item });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWish();
  }, []);
  console.log(wish, "wish");

  const removeWish = async (productId: number) => {
    try {
      setWishLoading((prev) => ({ ...prev, [productId]: true }));
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`${api}wish/`, { productId }, config);
      wishDispatch({ type: "REMOVE_FROM_WISH", payload: productId });
      setWishLoading((prev) => ({ ...prev, [productId]: false }));

      toast.success("product removed from wishlist", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      console.log(data, " deleted data");
    } catch (error) {
      console.log(error);
      setWishLoading((prev) => ({ ...prev, [productId]: false }));

      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    }
  };
  const addToCart = async (product: Product, quantity: number) => {
    try {
      setCartLoading((prev) => ({
        ...prev,
        [product._id]: true,
      }));
      if (user?.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${api}cart/add`,
          {
            productId: product._id,
            quantity,
          },
          config
        );
        cartDispatch({
          type: "ADD_TO_CART",
          payload: { productId: product._id, quantity },
        });
        toast.success("product added to cart", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        setCartLoading((prev) => ({
          ...prev,
          [product._id]: false,
        }));
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
      setCartLoading((prev) => ({
        ...prev,
        [product._id]: false,
      }));
    }
  };
  return (
    <div className="container mx-auto px-8 mt-20">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <>
          <div className="mt-32 flex items-center justify-center ">
            {wish.length === 0 && (
              <div className="flex flex-col  items-center space-y-4">
                <h1 className="text-2xl uppercase font-lora font-bold">
                  your wishlist is empty
                </h1>
                <button className="bg-yellow-400 w-40 py-2 uppercase text-white text-lg font-lora rounded-md">
                  <Link to="/products">explore here</Link>
                </button>
              </div>
            )}
          </div>
          <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {wish.map(({ product }) => (
              <div
                key={product._id}
                className="shadow-md relative py-4 px-2  flex flex-col justify-center items-center space-y-2"
              >
                <img
                  src={product.imageUrl}
                  className="w-60 h-60 object-cover object-top"
                />
                <p className="text-xl font-lora ">{product.brand}</p>
                <button
                  className="bg-yellow-400 w-32 py-1 text-white font-lora text-md uppercase"
                  onClick={() => addToCart(product, product.qty)}
                >
                  {cartLoading[product._id] ? (
                    <ClipLoader
                      color="white"
                      loading={true}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "add to cart"
                  )}
                </button>
                <button
                  className="absolute top-0 right-2 font-bold  text-2xl text-yellow-400"
                  onClick={() => removeWish(product._id)}
                >
                  {wishLoading[product._id] ? (
                    <ClipLoader
                      color="yellow"
                      loading={true}
                      size={25}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "x"
                  )}
                </button>
              </div>
            ))}
            <ToastContainer />
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
