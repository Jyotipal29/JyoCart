import { Link } from "react-router-dom";
import modal from "../assets/ecomm-modal-1.webp";
const Hero = () => {
  return (
    <div className="container mx-auto px-5 sm:px-2 mt-20">
      <div className="relative flex flex-col sm:flex-row justify-center items-center mt-2 bg-gray-200 rounded-2xl shadow-sm px-16 z-[5]">
        <div className="w-full sm:w-1/1 flex flex-col items-start justify-start space-y-3 py-12 z-10 order-last sm:order-first">
          <div className="sm:leading-10 font-lora">
            <span className="text-xl sm:text-3xl md:text-6xl uppercase font-semibold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-white relative inline-block">
              <span className="relative">let's</span>
            </span>
            <br />
            <span className="text-xl sm:text-3xl md:text-6xl uppercase font-semibold">
              explore
            </span>
            <br />
            <span className="text-xl sm:text-3xl md:text-6xl uppercase font-semibold before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-yellow-400 relative inline-block">
              <span className="relative">unique</span>
            </span>
            <br />
            <span className="text-xl sm:text-3xl md:text-6xl uppercase font-semibold">
              clothes
            </span>
          </div>
          <p className="sm:text-xl font-semibold font-charm">
            live for influential and innovative fashion
          </p>
          <Link to="/products">
            <button className="bg-black text-white py-3 px-7 rounded-md cursor-pointer ">
              shop now
            </button>
          </Link>
        </div>

        <div className=" absolute top-0 right-0 md:max-w-md w-full h-full">
          <div className="absolute top-0 left-0 w-full h-full bg-gray-600 md:hidden opacity-50"></div>
          <img
            src={modal}
            alt=""
            className="h-full w-full object-contain  max-w-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
