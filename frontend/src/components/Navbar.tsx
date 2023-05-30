import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-10">
      <div className="container mx-auto flex justify-between items-center px-2 py-3 ">
        <div className="uppercase text-4xl font-bold">
          <Link to="/">jyoCart</Link>
        </div>
        <ul className="flex relative items-center space-x-4 uppercase font-semibold  cursor-pointer">
          <li>
            <Link to="/products">Products</Link>
          </li>
          <li className="relative">
            <Link to="/cart">cart</Link>
            <div className="absolute bottom-3 left-5 bg-yellow-400 px-1 rounded-full">
              5
            </div>
          </li>
          <li>
            <Link to="/wish">wishlist</Link>
          </li>
          <button className="bg-black text-white py-1 px-3 rounded-md">
            <Link to="/register">Register</Link>
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
