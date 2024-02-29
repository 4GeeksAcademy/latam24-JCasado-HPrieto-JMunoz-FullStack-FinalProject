import React from "react";
import { FairyNavbar } from "./fairyNavbar";
import { Outlet } from "react-router-dom";
import { FairyFooter } from "./fairyFooter";
import "../../styles/fairy.css";


const FairyLayout = () => {

    return (

        <>
            <FairyNavbar />
        <div className="fairyBody">
            <Outlet />
        </div>    
            <FairyFooter />
        </>
    )
}

export default FairyLayout;
