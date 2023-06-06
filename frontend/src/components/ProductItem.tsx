import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext/cartContext";
import { useUser } from "../context/userContext/userContext";
import { useWish } from "../context/wishContext/wishContext";

const ProductItem = (item: Product) => {
  const navigate = useNavigate();
  const { cartDispatch } = useCart();
  const { wishDispatch } = useWish();
  const {
    userState: { user },
  } = useUser();

  const [loading, setLoading] = useState(false);
  const addToCart = async (product: Product, quantity: number) => {
    try {
      setLoading(true);
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
        toast.success("product added to cart");
        setLoading(false);
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
    }
  };
  const addToWish = async (product: Product, quantity: number) => {
    try {
      setLoading(true);
      if (user?.token) {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
        const { data } = await axios.post(
          `${api}wish/add`,
          {
            productId: product._id,
            quantity,
          },
          config
        );
        wishDispatch({
          type: "ADD_TO_WISH",
          payload: { productId: product._id, quantity },
        });
        toast.success("product added to wishlist");
        setLoading(false);
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong");
      setLoading(false);
    }
  };
  return (
    <div className="  flex flex-col m-2 justify-center items-center   py-2 cursor-pointer shadow-md rounded-md relative">
      <Link to={`/product/${item._id}`}>
        <img src={item.imageUrl} alt="" className="w-60 h-60" />
      </Link>

      <h1>{item.brand}</h1>
      <p>{item.price}</p>
      <button
        className="bg-yellow-400   text-white py-1 px-7 uppercase
         rounded-md"
        onClick={() => addToCart(item, item.qty)}
      >
        {loading ? (
          <ClipLoader
            color="white"
            loading={loading}
            size={25}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "add to cart"
        )}
      </button>
      <div className="absolute right-1 top-1">
        <AiOutlineHeart
          className="text-3xl"
          onClick={() => addToWish(item, item.qty)}
        />
      </div>
      <ToastContainer />
    </div>
  );
};

export default ProductItem;
