import { Outlet, Navigate } from "react-router";
import { useUser } from "../context/userContext/userContext";

const PrivateRoutes = () => {
  const {
    userState: { user },
  } = useUser();
  return user?.token ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
