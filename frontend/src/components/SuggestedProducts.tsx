import { Link } from "react-router-dom";
const SuggestedProducts = (item: Product) => {
  return (
    <div className="shadow-md rounded-md flex flex-col items-center py-2">
      <Link to={`/product/${item._id}`}>
        <img
          src={item.imageUrl}
          alt=""
          className="w-60 h-60 object-cover object-top"
        />
      </Link>
      <p className="font-lora text-lg  md:text-2xl font-semibold">
        {item.brand}
      </p>
    </div>
  );
};

export default SuggestedProducts;
