import Hero from "../components/Hero";
import Brand from "../components/Brand";
import NewArrivals from "../components/NewArrivals";
import Sale from "../components/Sale";
import Favourite from "../components/Favourite";
import { useUser } from "../context/userContext/userContext";

const Home = () => {
  const {
    userState: { user },
  } = useUser();

  console.log(user, "user");
  return (
    <div className="">
      <Hero />
      <Brand />
      <NewArrivals />
      <Sale />
      <Favourite />
      <div className="mt-5"></div>
    </div>
  );
};

export default Home;
