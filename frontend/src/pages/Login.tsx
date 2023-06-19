import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { api } from "../api/api";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext/userContext";
const Login = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { userDispatch } = useUser();
  const submitHandler: React.FormEventHandler<HTMLFormElement> = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(`${api}auth/login`, {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        userDispatch({ type: "LOGIN", payload: data });
        navigate("/");
        console.log(data, "data");
        setLoading(false);
      }

      setEmail("");
      setPassword("");
    } catch (err) {
      toast.error("something went wrong");
      setLoading(false);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <div className="container mx-auto px-8 mt-40 max-w-lg">
      <div className="  bg-white shadow-xl rounded-md  py-2 flex flex-col justify-start items-center">
        <h1 className="uppercase text-2xl font-bold font-lora">Login</h1>
        <form className=" w-3/4 my-2" onSubmit={submitHandler}>
          <div className=" py-2">
            <label className="block uppercase font-semibold text-sm text-slate-400 mb-1 font-lora ">
              email
            </label>
            <input
              value={email}
              type="email"
              className="border-2 py-1 block w-full  outline-none font-lora"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="block uppercase text-sm text-slate-400 mb-1 font-semibold font-lora  ">
              password
            </label>
            <div className="flex justify-center items-center border-2 ">
              <input
                value={password}
                type={open ? "text" : "password"}
                className="py-1 block w-full outline-none font-lora "
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye
                className="text-2xl mx-2 "
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="py-2 space-y-3">
            <button
              type="submit"
              className="bg-yellow-400 font-lora w-full py-1 uppercase text-white font-semibold text-xl "
            >
              {loading ? (
                <ClipLoader
                  color="white"
                  loading={loading}
                  size={25}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              ) : (
                "submit"
              )}
            </button>
            <button
              type="button"
              className=" border-2 border-yellow-400 font-lora w-full py-1 uppercase  font-semibold text-xl text-yellow-400 "
              onClick={() => {
                setEmail("guest@gmail.com");
                setPassword("guest");
              }}
            >
              guest
            </button>
            <button onClick={() => navigate("/register")} className="font-lora">
              Don't have an account ? Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
