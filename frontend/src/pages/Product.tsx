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
import ProductItem from "../components/ProductItem";
const Product = () => {
  const navigate = useNavigate();
  const [smallLoading, setSmallLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);
  const [suggestedProducts, setSuggestedProducts] = useState([]);
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

  const getSuggestedProducts = async () => {
    const { data } = await axios.get(`${api}products/${id}`);
    setSuggestedProducts(data);
    console.log(data, "suggested data");
  };

  useEffect(() => {
    getSuggestedProducts();
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
    <div className="container  mx-auto px-2 md:px-12 h-full flex  flex-col justify-center mt-20">
      {loading ? (
        <Loader loading={loading} />
      ) : (
        <div className="flex flex-col md:flex-row justify-between items-center bg-gray-100  md:px-4 md:py-5 rounded-xl">
          <div className="flex-1">
            <img
              src={product.imageUrl}
              className="w-96 h-96 rounded-xl mt-4"
              alt=""
            />
          </div>
          <div className="flex-1 px-4">
            <div className="space-y-6 py-5">
              <div className=" border-b">
                <h1 className="  text-xl  md:text-3xl font-bold font-lora">
                  {product?.brand}
                </h1>
                <p className=" text-md  md:text-xl text-gray-500 font-Montserrat">
                  {product.description}
                </p>
              </div>
              <div className="space-x-3 ">
                <span className="  text-md  md:text-xl font-bold font-lora">
                  Rs. {product.price}
                </span>
                <span className=" text-md  md:text-xl  font-lora text-gray-500 line-through">
                  {" "}
                  MRP 1350
                </span>
                <span className=" text-md   md:text-xl font-bold font-lora text-yellow-500">
                  (50 % off)
                </span>
              </div>

              <div className="  space-x-3  bg-white py-1  flex  justify-center items-center w-32">
                <button
                  className={`text-2xl font-lora
                    `}
                  onClick={() => setQty(qty + 1)}
                >
                  +
                </button>
                <p className="text-xl font-lora">{qty}</p>
                <button
                  className={`text-2xl cursor-pointer font-lora ${
                    product.qty === 1 ? "text-gray-400" : "text-black"
                  }`}
                  onClick={() => setQty(qty - 1)}
                  disabled={qty === 1}
                >
                  -
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className="bg-yellow-500 py-1 px-3 lg:py-3 lg:px-10 text-white uppercase font-semibold font-lora"
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
                <button className=" py-1 px-3 md:py-3 md:px-10 text-yellow-500 border-2 border-yellow-400 uppercase font-lora font-semibold">
                  wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2">
        {suggestedProducts.map((item: Product) => (
          <ProductItem {...item} />
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Product;
