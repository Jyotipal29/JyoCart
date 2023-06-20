import { Link } from "react-router-dom";
import modal6 from "../assets/ecomm-modal-10.jpg";
import modal7 from "../assets/ecomm-modal-7.webp";
import modal8 from "../assets/ecomm-modal-9.jpeg";
import { BsArrowRight } from "react-icons/bs";

const Favourite = () => {
  return (
    <div className=" container  mx-auto px-12  sm:px-2 mt-5">
      {/* new arrivals */}
      <h1 className="text-2xl font-bold uppercase font-lora">
        young's favourite
      </h1>
      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5">
        <div className="">
          <img
            src={modal6}
            alt=""
            className="w-96 h-96 rounded-xl  object-cover "
          />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold font-lora">Trending on instagram</h1>
              <h1 className="text-gray-400 font-lora">explore now</h1>
            </div>

            <div>
              <Link to="/products">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={modal7}
            alt=""
            className="w-96 h-96 rounded-xl object-cover"
          />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold font-lora">Trending on instagram</h1>
              <h1 className="text-gray-400 font-lora">explore now</h1>
            </div>

            <div>
              <Link to="/products">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div className="">
          <img
            src={modal8}
            alt=""
            className="w-96 h-96 rounded-xl object-cover"
          />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold font-lora">Trending on instagram</h1>
              <h1 className="text-gray-400 font-lora">explore now</h1>
            </div>

            <div>
              <Link to="/products">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Favourite;
