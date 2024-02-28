import React from "react";
import { ClientNavbar } from "./clientNavbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./footer";

const ClientLayout = () => {

    return (
        <>
            <ClientNavbar />
            <Outlet />
            <Footer />
        </>
    )
}

export default ClientLayout;