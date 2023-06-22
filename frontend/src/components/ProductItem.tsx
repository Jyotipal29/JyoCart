import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import ClipLoader from "react-spinners/ClipLoader";
import axios from "axios";
import { api } from "../api/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext/cartContext";
import { useUser } from "../context/userContext/userContext";
import { useWish } from "../context/wishContext/wishContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        const { data } = await axios.post<CartItem>(
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
        setCartLoading(false);
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
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setCartLoading(false);
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
        setWishLoading(false);
        toast.success("product added to wishlist", {
          position: "top-center",
          autoClose: 500,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      setWishLoading(false);
      toast.error("product added to wishlist", {
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
  return (
    <div className="  flex flex-col m-2 justify-center items-center   py-2 cursor-pointer shadow-md rounded-md relative px-2">
      <Link to={`/product/${item._id}`}>
        <img
          src={item.imageUrl}
          alt=""
          className="w-60 h-60 object-cover object-top"
        />
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
