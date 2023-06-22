import { useCart } from "../context/cartContext/cartContext";
import { useEffect, useState } from "react";
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
    street: "123 Main Street",
    city: "Example City",
    state: "Example State",
    country: "Example Country",
    postalCode: "12345",
  },
];
const Checkout = () => {
  const [cartCount, setCartCount] = useState(0);
  const [openModel, setOpenModel] = useState<boolean>(false);
  const [addressD, setAddressD] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [total, setTotal] = useState(0);
  const subTotal = total - 350;
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

  const getCart = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const { data } = await axios.get(`${api}cart/`, config);
    console.log(data, "in checkout page the cart data");
    setTotal(
      data.items.reduce((total: number, item: CartItem) => {
        const itemPrice = item.product.price * item.product.qty;
        return total + itemPrice;
      }, 0)
    );
  };
  useEffect(() => {
    getCart();
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
    await axios.delete(`${api}address/delete/${id}`, config);
    addressDispatch({ type: "DELETE_ADDRESS", payload: id });
    toast.success("address deleted", {
      position: "top-center",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "light",
    });
  };
  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };
  const orderhandler = async () => {
    if (!selectedAddress) {
      toast.error("please select address", {
        position: "top-center",
        autoClose: 500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const {
        data: { key },
      } = await axios.get(`${api}api/getkey`);
      const {
        data: { order },
      } = await axios.post(`${api}payment/checkout`, {
        amount: subTotal,
      });
      console.log(order, "order");
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "jyoti",
        description: "jyoCart project",
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

      razor.on("payment.success", async () => {
        await axios.delete(`${api}cart/`, config);

        cartDispatch({ type: "REMOVE_ALL" });
      });
    }
  };

  return (
    <>
      <div className="mt-20 bg-yellow-400 text-center py-2 uppercase text-2xl text-white font-lora">
        <h1>summary</h1>
      </div>
      <div className=" mt-5  container mx-auto px-2  flex  flex-col  md:flex-row   md:justify-between items-center w-full ">
        <div className="md:w-1/2 relative">
          <div className=" top-0">
            <div className="flex space-x-4 items-center">
              <button
                className="text-yellow-400 text-4xl"
                onClick={() => setOpenModel(!openModel)}
              >
                +
              </button>
              <span className="text-md uppercase font-lora mt-2">
                new address
              </span>
            </div>
            {addressD.map((item) => (
              <div className="bg-gray-100 rounded-lg flex m-5 h-full max-w-[500px] justify-start items-center px-1 py-6 relative">
                <span className="absolute top-2  right-2 mb-1 bg-yellow-300 px-1 text-sm rounded-md text-white font-lora">
                  default
                </span>
                <input
                  type="radio"
                  name="address"
                  checked={selectedAddress?._id === item._id}
                  onChange={() => handleAddressSelect(item)}
                />
                <div className="px-1 text-md font-semibold uppercase space-x-2">
                  <h1 className="text-lg font-semibold font-lora">
                    {item.street},
                  </h1>
                  <span className="font-lora">{item.city},</span>
                  <span className="font-lora">{item.state},</span>
                  <span className="font-lora">{item.country},</span>
                  <span className="font-lora">{item.postalCode}</span>
                </div>
              </div>
            ))}
            {address.map((item) => (
              <>
                <div className="max-w-[500px] bg-gray-100 m-5 h-full  rounded-lg px-4 py-4">
                  <div className="flex justify-between">
                    <button
                      className="bg-yellow-400 font-lora  px-2 text-white   rounded-md"
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
                      <h1 className="font-lora">{item.street},</h1>
                      <span className="font-lora">{item.city},</span>
                      <span className="font-lora">{item.state},</span>
                      <span className="font-lora">{item.country},</span>
                      <span className="font-lora">{item.postalCode}</span>
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
        <div className=" md:w-1/3 w-96 border-2   flex flex-col px-8 space-y-4 h-full  ">
          <div className="flex flex-col justify-center items-center mt-2">
            <h1 className="text-xl font-bold uppercase font-lora">Details</h1>
            <p className="text-lg font-semibold font-lora">{cartCount} items</p>
          </div>

          <span className="border-2 border-gray-300"></span>
          <div className="flex justify-between">
            <p className="text-lg font-semibold font-lora">Total price</p>
            <p className="font-semibold font-lora"> Rs. {total}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-lg font-semibold font-lora">Discount</p>
            <p className="font-semibold font-lora"> Rs. 350</p>
          </div>
          <span className="border-2 border-gray-300"></span>

          <div className="flex justify-between">
            <p className="text-lg font-bold font-lora">subtotal</p>
            <p className="font-semibold font-lora">Rs {subTotal}</p>
          </div>
          <button
            className="bg-yellow-400 font-lora uppercase text-xl font-bold text-white  py-1 "
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
