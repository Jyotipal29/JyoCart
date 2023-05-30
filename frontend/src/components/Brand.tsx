import biba from "../assets/biba-logo-removebg-preview.png";
import hm from "../assets/h_m-removebg-preview.png";
import zara from "../assets/zara-removebg-preview.png";
import van from "../assets/van-huesen-removebg-preview.png";
import allen from "../assets/allen-soly-logo-removebg-preview.png";

const Brand = () => {
  return (
    <div className="bg-yellow-400 py-4 mt-5 ">
      {/* brands */}
      <div className="container  mx-auto  sm:px-2 ">
        <div className="flex flex-wrap justify-evenly items-center space-x-12">
          <img src={biba} alt="" className="w-28 h-14" />
          <img src={hm} alt="" className="w-28 h-8" />
          <img src={zara} alt="" className="w-28 h-8" />
          <img src={van} alt="" className="w-28 h-14" />
          <img src={allen} alt="" className="w-28 h-14" />
        </div>
      </div>
    </div>
  );
};

export default Brand;
