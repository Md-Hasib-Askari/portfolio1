import {useUserStore} from "../store/User.js";
import {Navigate, Outlet} from "react-router-dom";

export const PrivateRoute = () => {
    const user = useUserStore((state) => state.user);
    return user.status === "active" ? <Outlet /> : <Navigate to="/login"/>;
}

export const PublicRoute = () => {
    const user = useUserStore((state) => state.user);
    return user.status !== "active" ? <Outlet /> : <Navigate to="/" />;
}