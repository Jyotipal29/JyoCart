import { Link } from "react-router-dom";
import modal from "../assets/ecomm-modal-1.webp";
const Hero = () => {
  return (
    <div className="container mx-auto px-5 sm:px-2 mt-20">
      <div className="flex justify-center items-center mt-2 bg-gray-200 rounded-2xl shadow-sm  px-16">
        <div className=" w-1/2 flex flex-col items-start justify-start space-y-3">
          <div className="leading-10 font-lora">
            <span className="  text-2xl sm:text-6xl   uppercase font-semibold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block  ">
              <span className="relative  ">let's</span>
            </span>
            <br></br>{" "}
            <span className="  text-2xl sm:text-6xl  uppercase font-semibold ">
              explore
            </span>{" "}
            <br></br>{" "}
            <span className=" text-2xl sm:text-6xl   uppercase font-semibold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-400 relative inline-block ">
              <span className="relative">unique</span>
              {/* unique */}
            </span>{" "}
            <br></br>{" "}
            <span className=" text-2xl sm:text-6xl   uppercase font-semibold ">
              clothes
            </span>
          </div>
          <p className="  text-xl font-semibold font-charm ">
            live for influential and innovative fashion
          </p>
          <button className="bg-black text-white py-3 px-7 rounded-md">
            <Link to="/products">shop now</Link>
          </button>
        </div>
        <div className="  flex-1 flex justify-end items-center">
          <img src={modal} alt=" " className="h-full w-full " />
        </div>
      </div>
    </div>
  );
};

export default Hero;
