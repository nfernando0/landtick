import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext";

export const PrivateRoute = () => {

    const [state] = useContext(UserContext)
    if (state?.user?.role !== "user") return <Navigate to="/" />

    return state.isLogin ? <Outlet /> : <Navigate to="/" />;
}

export const PrivateRouteAdmin = () => {
    const [state] = useContext(UserContext)

    if (state?.user?.role !== "admin") return <Navigate to="/" />;

    return <Outlet />;
}