import axios from "axios";
import { api } from "../api/api";
import { useEffect } from "react";
import { useProduct } from "../context/productContext/productContext";
import ProductItem from "../components/ProductItem";

const Products = () => {
  const {
    productState: { products },
    productDispatch,
  } = useProduct();
  const getProduct = async () => {
    const { data } = await axios.get(`${api}products/`);
    // console.log(data, "data");
    productDispatch({ type: "GET_PRODUCTS", payload: data });
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="flex  gap-4  container mx-auto px-2 mt-20 relative  ">
      <div className="flex-1">
        <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2">
          {products.map((item) => (
            <ProductItem {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
