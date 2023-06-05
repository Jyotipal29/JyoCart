import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../context/userContext/userContext";
import axios from "axios";
import { api } from "../api/api";
import { useAddress } from "../context/addressContext/addresscontext";

type ModalState = {
  openModel: boolean;
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
};


const AddressModal = ({ setOpenModel }: ModalState) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const {
    userState: { user },
  } = useUser();
  const {
    addressState: { address },
    addressDispatch,
  } = useAddress();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    try {
      if (!street || !city || !state || !country || !postalCode) {
        toast.error("please fill all the fields");
      }
      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };

      const { data } = await axios.post<Address>(
        `${api}address/add`,
        {
          street,
          city,
          state,
          country,
          postalCode,
        },
        config
      );
      if (data) {
        toast.success("address added");
        addressDispatch({ type: "ADD_ADDRESS", payload: data });
        setOpenModel(false);
      }
      console.log(data, "data address");
    } catch (error) {
      toast.error("somehting went wrong");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50  `}>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-lg w-80 sm:w-96">
        <button
          className="absolute top-3 right-3 px-2 text-3xl font-bold text-yellow-400"
          onClick={() => setOpenModel(false)}
        >
          &times;
        </button>

        <form
          className="px-4 py-4 flex flex-col items-center w-full space-y-2"
          onSubmit={submitHandler}
        >
          <div className=" w-full">
            <label className="block  text-sm text-gray-600 font-semibold mb-1">
              Street
            </label>
            <input
              value={street}
              className="border-2 block w-full py-1"
              onChange={(e) => setStreet(e.target.value)}
            />
          </div>
          <div className=" w-full">
            <label className="block  text-sm text-gray-600 font-semibold mb-1">
              city
            </label>
            <input
              value={city}
              className="border-2 block w-full py-1"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className=" w-full">
            <label className="block  text-sm text-gray-600 font-semibold mb-1">
              State
            </label>
            <input
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="border-2 block w-full py-1"
            />
          </div>
          <div className=" w-full">
            <label className="block  text-sm text-gray-600 font-semibold mb-1">
              Country
            </label>
            <input
              value={country}
              className="border-2 block w-full py-1"
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className=" w-full mb-2">
            <label className="block  text-sm text-gray-600 font-semibold mb-1">
              Postalcode
            </label>
            <input
              value={postalCode}
              className="border-2 block w-full py-1"
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>
          <button
            className="bg-yellow-400 w-full py-1 rounded-md text-white"
            type="submit"
          >
            submit
          </button>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddressModal;
