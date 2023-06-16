import { useCart } from "../context/cartContext/cartContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
import { useAddress } from "../context/addressContext/addresscontext";
import { api } from "../api/api";
import axios from "axios";
import AddressModal from "../components/AddressModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const defaultAddresses: Address[] = [
  {
    _id: "1",
    street: "behind shani mandir panchali vihar",
    city: "bilaspur",
    state: "chhattisgarh",
    country: "india",
    postalCode: "495550",
  },
];
const Checkout = () => {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [addressD, setAddressD] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [total, setTotal] = useState(0);

  const {
    userState: { user },
  } = useUser();
  const {
    cartState: { cart },
    cartDispatch,
  } = useCart();
  const {
    addressState: { address },
    addressDispatch,
  } = useAddress();
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

  useEffect(() => {
    if (cart) {
      setTotal(
        cart.reduce((total, item) => {
          const itemPrice = item.product.price * item.product.qty;
          return total + itemPrice;
        }, 0)
      );
    }
  }, [cart]);
  useEffect(() => {
    setAddressD(defaultAddresses);
  }, []);

  const getAddress = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get<Address[]>(`${api}address/`, config);
    addressDispatch({ type: "GET_ADDRESS", payload: data });
  };

  useEffect(() => {
    getAddress();
  }, []);
  console.log(address, "address");

  const deleteHandler = async (id: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.delete(`${api}address/delete/${id}`, config);
    addressDispatch({ type: "DELETE_ADDRESS", payload: id });
  };
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };
  const orderhandler = async () => {
    if (!selectedAddress) {
      toast.error("please select address");
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.delete(`${api}cart/`, config);
      cartDispatch({ type: "REMOVE_ALL" });
      const {
        data: { key },
      } = await axios.get(`${api}api/getkey`);
      const {
        data: { order },
      } = await axios.post(`${api}payment/checkout`, {
        amount: 500,
      });
      console.log(order, "order");
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "jyoti",
        description: "jyoCart project",
        // image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        order_id: order.id,
        callback_url: `${api}payment/paymentVerification`,
        prefill: {
          name: user?.name,
          email: user?.email,
          contact: "6262626262",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      navigate("/products");
    }
  };

  return (
    <>
      <div className="mt-20 bg-yellow-400 py-3 text-white text-2xl uppercase font-bold text-center">
        <h1>your order</h1>
      </div>
      <div className="  container mx-auto px-2 mt-5 flex  flex-col  md:flex-row   md:justify-between items-center w-full ">
        <div className="md:w-1/2 relative">
          <div>
            <div className="flex items-center space-x-4">
              <button
                className="text-yellow-400 text-4xl"
                onClick={() => setOpenModel(!openModel)}
              >
                +
              </button>
              <span className="text-md uppercase">new address</span>
            </div>
            {addressD.map((item) => (
              <div className="bg-gray-100 rounded-lg flex m-5 h-full w-96 justify-start items-center px-4 py-6 relative">
                <span className="absolute top-2  right-2 mb-1 bg-yellow-300 px-1 text-sm rounded-md text-white">
                  default
                </span>
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?._id === item._id}
                  onChange={() => handleAddressSelect(item)}
                />
                <div className="px-3 text-md font-semibold uppercase space-x-2">
                  <h1 className="text-lg font-semibold">{item.street},</h1>
                  <span>{item.city},</span>
                  <span>{item.state},</span>
                  <span>{item.country},</span>
                  <span>{item.postalCode}</span>
                </div>
              </div>
            ))}
            {address.map((item) => (
              <>
                <div className="w-96 bg-gray-100 m-5 h-full  rounded-lg px-4 py-4">
                  <div className="flex justify-between">
                    {/* <button className="bg-yellow-400  px-3 text-white uppercase font-semibold rounded-md">
                      edit
                    </button> */}
                    <button
                      className="bg-yellow-400  px-3 text-white uppercase font-semibold rounded-md"
                      onClick={() => deleteHandler(item._id)}
                    >
                      delete
                    </button>
                  </div>
                  {}
                  <div className="flex justify-start items-center mt-1">
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress?._id === item._id}
                      onChange={() => handleAddressSelect(item)}
                    />
                    <div className="px-4 space-x-2 text-lg font-semibold">
                      <h1>{item.street},</h1>
                      <span>{item.city},</span>
                      <span>{item.state},</span>
                      <span>{item.country},</span>
                      <span>{item.postalCode}</span>
                    </div>
                  </div>
                </div>
              </>
            ))}
          </div>
          {openModel && (
            <AddressModal setOpenModel={setOpenModel} openModel={openModel} />
          )}
        </div>
        <div className=" md:w-1/3 w-96 border-2   flex flex-col px-8 space-y-4 h-full ">
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-xl font-bold uppercase">Details</h1>
            <p className="text-lg font-semibold">{cartCount} items</p>
          </div>

          <span className="border-2 border-gray-300"></span>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Total price</p>
            <p className="font-semibold"> Rs. {total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold">Discount</p>
            <p className="font-semibold"> Rs. 350</p>
          </div>
          <span className="border-2 border-gray-300"></span>

          <div className="flex justify-between">
            <p className="text-lg font-bold ">subtotal</p>
            <p className="font-semibold">Rs {total - 350}</p>
          </div>
          <button
            className="bg-yellow-400 uppercase text-xl font-bold text-white rounded-md py-1 "
            onClick={orderhandler}
          >
            pay now
          </button>
          <p className="mt-2"></p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Checkout;
