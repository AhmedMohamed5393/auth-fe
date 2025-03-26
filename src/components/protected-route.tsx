import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const ProtectedRoute: React.FC = () => {
  const token: string | null = useSelector((state: RootState) => state.auth.token);

  if (!token) {
    return <Navigate to="/signin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
