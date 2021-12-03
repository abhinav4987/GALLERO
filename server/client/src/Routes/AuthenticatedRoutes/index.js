import React,{Fragment} from 'react'
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import {Route} from 'react-router-dom';

function AuthenticatedRoute({children}) {

    const { loading, isAuthenticated,} = useSelector((state) => state.user);
    
        if (!isAuthenticated) {
            return <Navigate to="/auth"/>
        }

    return <Outlet />
}

export default AuthenticatedRoute
