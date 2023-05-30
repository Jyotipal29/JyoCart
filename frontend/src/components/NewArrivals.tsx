import { Link } from "react-router-dom";
import modal2 from "../assets/ecomm-modal-2.webp";
import modal3 from "../assets/ecomm-modal-3.jpg";
import modal4 from "../assets/ecomm-modal-4.webp";
import { BsArrowRight } from "react-icons/bs";

const NewArrivals = () => {
  return (
    <div className=" container  mx-auto px-12  sm:px-2 mt-5">
      {/* new arrivals */}
      <h1 className="text-2xl font-bold uppercase ">new arrivals</h1>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-10 mt-5">
        <div>
          <img src={modal2} alt="" className="w-96 h-96 rounded-xl" />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Hoodies & Sweetshirt</h1>
              <h1 className="text-gray-400">explore now</h1>
            </div>
            <div>
              <Link to="/productlisting">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={modal3} alt="" className="w-96 h-96 rounded-xl" />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Hoodies & Sweetshirt</h1>
              <h1 className="text-gray-400">explore now</h1>
            </div>
            <div>
              <Link to="/productlisting">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img src={modal4} alt="" className="w-96 h-96 rounded-xl" />
          <div className="flex justify-between items-center">
            <div>
              <h1 className="font-semibold">Hoodies & Sweetshirt</h1>
              <h1 className="text-gray-400">explore now</h1>
            </div>
            <div>
              <Link to="/productlisting">
                <BsArrowRight className="text-gray-500 text-2xl" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
