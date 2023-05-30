import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { api } from "../api/api";
import { useProduct } from "../context/productContext/productContext";
const Product = () => {
  const { id } = useParams();
  const {
    productState: { product },
    productDispatch,
  } = useProduct();

  const getOneProduct = async () => {
    const { data } = await axios.get(`${api}products/find/${id}`);
    console.log(data, "data");
    productDispatch({ type: "GET_ONE_PRODUCT", payload: data });
  };

  useEffect(() => {
    getOneProduct();
  }, [id]);

  return (
    <div className="container  mx-auto px-12 h-full flex justify-center mt-20">
      <div className=" flex relative ">
        <button className="absolute top-0 left-0 border-2 px-4">back</button>

        <div>
          <img src={product.imageUrl} className="w-96 h-96" alt="" />
        </div>
        <div className="space-y-4 py-5">
          <h1 className="text-3xl font-bold">{product?.brand}</h1>
          <p className="text-2xl text-gray-300">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
          <div className="space-x-3"></div>
          <div className="flex space-x-4">
            <button className="bg-green-500 py-1 px-5 text-white">
              add to cart
            </button>
            <button className="bg-red-500 py-1 px-5 text-white">
              wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
