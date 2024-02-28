import React from "react";
import { FairyNavbar } from "./fairyNavbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";


const FairyLayout = () => {

    return (
        
        <>
            <FairyNavbar />
            <Outlet />
            <Footer />
        </>
    )
}


export default FairyLayout;
