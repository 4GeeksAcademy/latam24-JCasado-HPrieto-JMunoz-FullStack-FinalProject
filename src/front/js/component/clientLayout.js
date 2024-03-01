import React from "react";
import { ClientNavbar } from "./clientNavbar";
import { Outlet } from "react-router-dom";
import { ClientFooter } from "./clientFooter";
import "../../styles/index.css";
import "../../styles/client.css";


const ClientLayout = () => {

    return (
        <>
            <ClientNavbar />
            <div className="clientBody">
                <Outlet />
            </div>
            <ClientFooter />
        </>
    )
}

export default ClientLayout;