import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { api } from "../api/api";
import { useProduct } from "../context/productContext/productContext";
import { useCart } from "../context/cartContext/cartContext";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
const Product = () => {
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  // const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const {
    productState: { product },
    productDispatch,
  } = useProduct();

  console.log(product, "product");
  const { cartDispatch } = useCart();
  const {
    userState: { user },
  } = useUser();

  const getOneProduct = async () => {
    setLoading(true);
    const { data } = await axios.get<Product>(`${api}products/find/${id}`);
    console.log(data, "data");
    productDispatch({ type: "GET_ONE_PRODUCT", payload: data });
    setLoading(false);
  };

  useEffect(() => {
    getOneProduct();
  }, [id]);

  const addToCart = async (product: Product, quantity: number) => {
    try {
      setSmallLoading(true);
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
        setSmallLoading(false);
        console.log(data, "data");
      } else {
        navigate("/login");
      }
    } catch (error) {
      toast.error("something went wrong");
      setSmallLoading(false);
    }
  };

  return (
    <div className="container  mx-auto px-12 h-full flex justify-center mt-20">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className=" flex relative ">
          <button
            className="absolute top-0 left-0 border-2 px-4"
            onClick={() => navigate("/products")}
          >
            back
          </button>

          <div>
            <img src={product.imageUrl} className="w-96 h-96" alt="" />
          </div>
          <div className="space-y-4 py-5">
            <h1 className="text-3xl font-bold">{product?.brand}</h1>
            <p className="text-2xl text-gray-300">{product.description}</p>
            <p className="text-2xl font-bold">${product.price}</p>
            <div className=" flex  items-center  space-x-3">
              <button
                className={`bg-yellow-500  px-2 text-white ${
                  product.qty === 1 ? "bg-gray-400" : "bg-yellow-500"
                }`}
                onClick={() => setQty(qty + 1)}
              >
                +
              </button>
              <p>{qty}</p>
              <button
                className={`bg-yellow-500  px-2 text-white ${
                  product.qty === 1 ? "bg-gray-400" : "bg-yellow-500"
                }`}
                onClick={() => setQty(qty - 1)}
              >
                -
              </button>
            </div>
            <div className="flex space-x-4">
              <button
                className="bg-yellow-500 py-1 px-5 text-white"
                onClick={() => addToCart(product, qty)}
              >
                {smallLoading ? (
                  <ClipLoader
                    color="white"
                    loading={smallLoading}
                    size={25}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                ) : (
                  "add to cart"
                )}
              </button>
              <button className="bg-red-500 py-1 px-5 text-white">
                wishlist
              </button>
            </div>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default Product;
