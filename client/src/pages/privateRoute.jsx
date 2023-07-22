import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

export const PrivateRoute = () => {
    const [state] = useContext(UserContext)

    if (state.user.role !== "user") {
        return <Navigate to="/" />
    }

    return state.isLogin ? <Outlet /> : <Navigate to="/" />
}

export function PrivateRouteAdmin() {
    const [state] = useContext(UserContext);
    console.log("state ", state.user.role);
    if (state.user.role === "admin") {
        return <Outlet />
    }

    return state.isLogin ? <Outlet /> : <Navigate to="/" />
}