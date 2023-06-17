import { Link } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api/api";
import { useCart } from "../context/cartContext/cartContext";
import { useWish } from "../context/wishContext/wishContext";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const {
    userState: { user },
  } = useUser();
  const {
    cartState: { cart },
  } = useCart();
  const {
    wishState: { wish },
  } = useWish();

  const getWishCount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}wish/count`, config);
    setWishCount(data.count);
  };

  useEffect(() => {
    getWishCount();
  }, [wish]);
  const getCartCount = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}cart/count`, config);
    setCartCount(data.count);
  };

  useEffect(() => {
    getCartCount();
  }, [cart]);

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-10 ">
      <div className="container mx-auto px-8 flex items-center justify-between relative">
        <div className="font-charm uppercase text-4xl text-yellow-400">
          <Link to="/">jyoCart</Link>
        </div>

        <div className="flex items-center">
          <ul
            className={` md:flex md:items-center ${
              isOpen
                ? "flex-col  absolute top-12 left-5  bg-gray-100 w-11/12 rounded-lg px-4 mx-auto container"
                : "hidden"
            }`}
          >
            <li className="relative mx-4 my-2 py-2">
              <Link to="/cart">
                <ShoppingCartOutlinedIcon />
              </Link>
              <div className="absolute bottom-3 left-5 bg-yellow-400 px-1 rounded-full">
                {/* {cartCount} */}
              </div>
            </li>
            <li className="relative mx-4 py-2">
              <Link to="/wish">
                <FavoriteBorderOutlinedIcon />
              </Link>
              <div className="absolute bottom-3 left-5 bg-yellow-400 px-1 rounded-full">
                {/* {wishCount} */}
              </div>
            </li>
            {user?.token ? (
              <div className="px-4  py-2 md:flex md:items-center md:space-x-4">
                <p className="border-2 rounded-full px-4 text-yellow-400 border-yellow-400 w-4 h-8">
                  {user?.name?.charAt(0)}
                </p>
                <button onClick={logoutHandler}>
                  <LogoutOutlinedIcon />
                </button>
              </div>
            ) : (
              <button className="bg-black text-white py-1 px-3 rounded-md">
                <Link to="/login">login</Link>
              </button>
            )}
          </ul>

          <div
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden cursor-pointer"
          >
            <MenuOutlinedIcon />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
