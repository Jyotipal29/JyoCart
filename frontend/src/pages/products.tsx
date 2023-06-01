import axios from "axios";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useProduct } from "../context/productContext/productContext";
import ProductItem from "../components/ProductItem";
import Loader from "../components/Loader";

const Products = () => {
  const [loading, setLoading] = useState(false);
  const {
    productState: { products },
    productDispatch,
  } = useProduct();
  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get(`${api}products/`);
    // console.log(data, "data");
    productDispatch({ type: "GET_PRODUCTS", payload: data });
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="mt-20 bg-yellow-400 py-3">
        <h1 className="text-center uppercase text-white text-2xl font-bold">
          All Products
        </h1>
      </div>
      <div className="flex  gap-4  container mx-auto px-2 mt-5 relative  ">
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <div className="flex-1">
            <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2">
              {products.map((item) => (
                <ProductItem {...item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
