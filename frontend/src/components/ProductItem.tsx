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

  const [cartLoading, setCartLoading] = useState(false);
  const [wishLoading, setWishLoading] = useState(false);
  const addToCart = async (product: Product, quantity: number) => {
    try {
      setCartLoading(true);
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
        setCartLoading(false);
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong");
      setCartLoading(false);
    }
  };
  const addToWish = async (product: Product, quantity: number) => {
    try {
      setWishLoading(true);
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
        setWishLoading(false);
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong");
      setWishLoading(false);
    }
  };
  return (
    <div className="  flex flex-col m-2 justify-center items-center   py-2 cursor-pointer shadow-md rounded-md relative px-2">
      <Link to={`/product/${item._id}`}>
        <img src={item.imageUrl} alt="" className="w-60 h-60 object-cover" />
      </Link>

      <h1>{item.brand}</h1>
      <p>{item.price}</p>
      <button
        className="bg-yellow-400   text-white w-32 py-1 uppercase font-lora text-sm
         "
        onClick={() => addToCart(item, item.qty)}
      >
        {cartLoading ? (
          <ClipLoader
            color="white"
            loading={cartLoading}
            size={15}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "add to cart"
        )}
      </button>
      <button
        className="absolute right-1 top-1"
        onClick={() => addToWish(item, item.qty)}
      >
        {wishLoading ? (
          <ClipLoader
            color="yellow"
            loading={wishLoading}
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          <AiOutlineHeart className="text-3xl " />
        )}
      </button>
      <ToastContainer />
    </div>
  );
};

export default ProductItem;
