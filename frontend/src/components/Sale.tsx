import { Link } from "react-router-dom";
import modal5 from "../assets/ecomm-modal-5-removebg-preview.png";
const Sale = () => {
  return (
    <div className="  mt-5 bg-yellow-400">
      <div className="  flex  items-center justify-between gap-10 container mx-auto px-2  ">
        {/* imag */}
        <div className="flex-1">
          <img src={modal5} alt="" className=" w-40 md:h-96 md:w-96" />
        </div>
        {/* text */}
        <div className="flex-1 flex flex-col justify-end items-start space-y-2  ">
          <h1 className="leading-5 md:leading-10 font-lora">
            <span className="text-lg  sm:text-6xl uppercase font-bold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block  ">
              <span className="relative  ">payday</span>
            </span>
            <br></br>
            <span className="text-2xl sm:text-6xl uppercase font-bold ">
              sale now
            </span>
          </h1>
          <p className=" text-sm sm:text-xl font-semibold  font-charm">
            spend minimal $100 get 30% off <br></br> voucher code for your next
            purchase
          </p>
          <p className="  sm:text-2xl font-bold font-lora">
            1 June - 10 June 2023
          </p>
          <p className=" text-sm sm:text-xl font-semibold font-charm">
            *Terms & Conditions apply
          </p>
          <div className="py-2">
            <button className="bg-black text-white py-2 sm:py-3 px-7 rounded-md">
              <Link to="/products">shop now</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sale;
