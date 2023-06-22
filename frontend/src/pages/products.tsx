import axios from "axios";
import { api } from "../api/api";
import { useEffect, useState } from "react";
import { useProduct } from "../context/productContext/productContext";
import ProductItem from "../components/ProductItem";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import TuneIcon from "@mui/icons-material/Tune";
const Products = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<boolean>(false);

  const {
    // productState: { products, sort, filters },
    productDispatch,
    filteredProducts,
  } = useProduct();

  const getProduct = async () => {
    setLoading(true);
    const { data } = await axios.get<Product[]>(`${api}products/`);
    // console.log(data, "data");
    productDispatch({ type: "GET_PRODUCTS", payload: data });
    setLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-4  container mx-auto px-2 mt-20 relative  ">
        {loading ? (
          <Loader loading={loading} />
        ) : (
          <div className="flex justify-between">
            <div className="shadow-lg fixed top-20 left-15  w-64 py-4 hidden md:block">
              <Filters open={open} setOpen={setOpen} />
            </div>

            {open && (
              <div className="fixed inset-0 z-50 flex items-center justify-center md:hidden">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="z-10 bg-white shadow-lg rounded-lg">
                  <div className="py-2 space-y-10 mx-2 px-4">
                    <Filters open={open} setOpen={setOpen} />
                  </div>
                </div>
              </div>
            )}
            <div className="flex-1 md:pl-64">
              <div className="px-4 flex items-center ">
                <h1 className="uppercase text-yellow-400 font-lora font-bold text-xl pr-4">
                  all products
                </h1>
                <span
                  className="text-yellow-400 md:hidden cursor-pointer"
                  onClick={() => {
                    setOpen(!open);
                    console.log("clicking", open);
                  }}
                >
                  <TuneIcon />
                </span>
              </div>

              <div className="grid lg:grid-cols-4  md:grid-cols-3 grid-cols-2">
                {filteredProducts.map((item) => (
                  <>
                    <ProductItem {...item} />
                  </>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
