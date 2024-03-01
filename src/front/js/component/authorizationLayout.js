import React from "react";
import { Outlet } from "react-router-dom";


const AuthorizatioLayaout = () => {

    return (

        <div className="logiRegisterBody">
            <Outlet />
        </div>
    )
}

export default AuthorizatioLayaout;