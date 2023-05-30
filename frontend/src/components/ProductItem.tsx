import { Link } from "react-router-dom";
import { AiOutlineHeart } from "react-icons/ai";
import { Product } from "../type";

const ProductItem = (item: Product) => {
  console.log(item, "item");
  return (
    <div className="  flex flex-col m-2 justify-center items-center   py-2 cursor-pointer shadow-md rounded-md relative">
      <Link to={`/product/${item.id}`}>
        <img src={item.imageUrl} alt="" className="w-60 h-60" />
      </Link>

      <h1>{item.brand}</h1>
      <p>{item.price}</p>
      <button className="bg-yellow-400   text-white py-1 px-7 uppercase rounded-md">
        add to cart
      </button>
      <div className="absolute right-1 top-1">
        <AiOutlineHeart className="text-3xl" />
      </div>
    </div>
  );
};

export default ProductItem;
