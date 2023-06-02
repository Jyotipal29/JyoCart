import { useState } from "react";

type ModalState = {
  openModel: boolean;
  setOpenModel: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddressModal = ({ openModel, setOpenModel }: ModalState) => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log({ street, city, country, state, postalCode });
    setOpenModel(false);
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
    </div>
  );
};

export default AddressModal;
