import { AiOutlineEye } from "react-icons/ai";
import { useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const submitHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    console.log({ name, password, email });
    setEmail("");
    setName("");
    setPassword("");
  };
  return (
    <div className="container mx-auto px-8 mt-40 max-w-lg">
      <div className="  bg-white shadow-xl rounded-sm  py-2 flex flex-col justify-start items-center">
        <h1 className="uppercase text-2xl font-bold">register</h1>
        <form className=" w-3/4 my-2" onSubmit={submitHandler}>
          <div className=" py-2">
            <label className="block font-semibold uppercase text-sm text-slate-400 mb-1 ">
              name
            </label>
            <input
              value={name}
              type="text"
              className="border-2 py-1 block w-full rounded-md outline-none"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="block uppercase font-semibold text-sm text-slate-400 mb-1 ">
              email
            </label>
            <input
              value={email}
              type="email"
              className="border-2 py-1 block w-full rounded-md outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className=" py-2">
            <label className="block uppercase text-sm text-slate-400 mb-1 font-semibold  ">
              password
            </label>
            <div className="flex justify-center items-center border-2 rounded-md">
              <input
                value={password}
                type={open ? "text" : "password"}
                className="py-1 block w-full rounded-md outline-none "
                onChange={(e) => setPassword(e.target.value)}
              />
              <AiOutlineEye
                className="text-2xl mx-2 "
                onClick={() => setOpen(!open)}
              />
            </div>
          </div>
          <div className="py-2">
            <button
              type="submit"
              className="bg-yellow-400 w-full py-1 uppercase text-white font-semibold text-xl rounded-md"
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
            <button onClick={() => navigate("/login")}>
              Already have an account ? Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
