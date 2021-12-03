import React,{Fragment} from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";

function ProtectedRoute({ isAdmin, component: Component, ...rest}) {

    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if (!isAuthenticated) {
        return <Navigate to="/auth"/>
    }

    if(!isAuthenticated && user.role === "admin"){
        return <Outlet />
    } else {
        return <Navigate to="/*"/>
    }
}

export default ProtectedRoute