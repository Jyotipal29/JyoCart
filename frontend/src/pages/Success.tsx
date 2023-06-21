import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <div className="mt-40 container mx-auto px-8 flex items-center justify-center max-w:[500px] ">
      <div className="shadow-lg py-5 px-5 flex flex-col items-center space-y-8 rounded-lg">
        <h1 className="font-lora text-md md:text-2xl uppercase font-semibold">
          your order has been successfully placed
        </h1>
        <button
          onClick={() => navigate("/products")}
          className=" text-md md:text-xl font-bold uppercase font-lora bg-yellow-500 text-white w-68 px-2 py-2"
        >
          continue shopping
        </button>
      </div>
    </div>
  );
};

export default Success;
