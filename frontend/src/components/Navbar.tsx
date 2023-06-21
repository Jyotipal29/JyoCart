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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
    toast.success("user logged out", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
    navigate("/login");
  };
  return (
    <div className="fixed top-0 left-0 w-full bg-white z-10 py-2 ">
      <div className="container mx-auto px-8 flex items-center justify-between relative ">
        <div className="font-charm uppercase text-4xl text-yellow-400">
          <Link to="/">jyoCart</Link>
        </div>

        <div className="flex items-center justify-between">
          <ul
            className={` md:flex md:items-center ${
              isOpen
                ? " max-md:flex-col  max-md:absolute max-md:top-12 max-md:left-5  max-md:bg-gray-100  max-md:w-11/12 max-md:rounded-lg max-md:px-4 max-md:mx-auto max-md:container"
                : "hidden"
            }`}
          >
            <li className="relative mx-4 py-2 mt-2 md:mt-0">
              <Link to="/cart">
                <ShoppingCartOutlinedIcon />
              </Link>
              <span className="absolute top-0 left-4 bg-yellow-400 w-6 rounded-full text-center ">
                {cartCount}
              </span>
            </li>
            <li className="relative mx-4 py-2 ">
              <Link to="/wish">
                <FavoriteBorderOutlinedIcon />
              </Link>
              <span className="absolute top-0 left-4 bg-yellow-400 w-6 text-center rounded-full ">
                {wishCount}
              </span>
            </li>
            {user?.token ? (
              <>
                <li className="mx-4 py-2">
                  <p className="border-2 rounded-full text-yellow-400 border-yellow-400 w-8 h-8 text-center ">
                    {user?.name?.charAt(0)}
                  </p>
                </li>
                <li className="mx-4 py-2">
                  <button onClick={logoutHandler} className="">
                    <LogoutOutlinedIcon />
                  </button>
                </li>
              </>
            ) : (
              <li className="">
                <button className="bg-black text-white   py-1 px-4 rounded-md ">
                  <Link to="/login">login</Link>
                </button>
              </li>
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
      <ToastContainer />
    </div>
  );
};

export default Navbar;
