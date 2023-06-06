import { useWish } from "../context/wishContext/wishContext";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext/userContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { api } from "../api/api";
const Wishlist = () => {
  const [loading, setLoading] = useState(false);

  const {
    userState: { user },
  } = useUser();
  const {
    wishState: { wish },
    wishDispatch,
  } = useWish();

  const getWish = async () => {
    setLoading(true);
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}wish/`, config);
    wishDispatch({ type: "GET_WISH", payload: data.item });
    setLoading(false);
    console.log(data.item, "data");
  };

  useEffect(() => {
    getWish();
  }, []);
  console.log(wish, "wish");

  const removeWish = async (productId: number) => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      const { data } = await axios.post(`${api}wish/`, { productId }, config);
      wishDispatch({ type: "REMOVE_FROM_WISH", payload: productId });
      toast.success("product removed from cart");
      console.log(data, " deleted data");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }
  };
  return (
    <div className="mt-20">
      {wish.map(({ product }) => (
        <div className="border-2">
          <img src={product.imageUrl} alt="" className="w-60" />
          <button onClick={() => removeWish(product._id)}>&times;</button>
        </div>
      ))}
      <ToastContainer />
    </div>
  );
};

export default Wishlist;
