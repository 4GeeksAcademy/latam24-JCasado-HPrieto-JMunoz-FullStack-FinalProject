import React from "react";
import { ClientNavbar } from "./clientNavbar";
import { Outlet } from "react-router-dom";
import { ClientFooter } from "./clientFooter";

const ClientLayout = () => {

    return (
        <>
            <ClientNavbar />
            <Outlet />
            <ClientFooter />
        </>
    )
}

export default ClientLayout;