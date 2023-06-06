import { Link } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { api } from "../api/api";
import { useCart } from "../context/cartContext/cartContext";
import { useWish } from "../context/wishContext/wishContext";
const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);
  const [wishCount, setWishCount] = useState(0);

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
              {cartCount}
            </div>
          </li>
          <li>
            <Link to="/wish">wishlist</Link>
            <div className="absolute bottom-3 left-5 bg-yellow-400 px-1 rounded-full">
              {wishCount}
            </div>
          </li>
          {user?.token ? (
            <>
              <p className="border-2 rounded-full px-2 text-yellow-400 border-yellow-400">
                {user?.name?.charAt(0)}
              </p>
              <button onClick={logoutHandler}>logout</button>
            </>
          ) : (
            <button className="bg-black text-white py-1 px-3 rounded-md">
              <Link to="/login">login</Link>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
