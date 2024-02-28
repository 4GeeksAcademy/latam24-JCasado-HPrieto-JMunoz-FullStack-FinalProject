import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import ClientHome from "./pages/clientsPages/clientHome";
import ProductsMenuView from "./pages/clientsPages/productsMenuView";
import FairySelection from "./pages/clientsPages/selectFairyView";
import injectContext from "./store/appContext";

import { ClientNavbar } from "./component/clientNavbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import Payment from "./pages/clientsPages/payment"
import { FairyDetails } from "./pages/clientsPages/fairyDetails";
import { ClientDetails } from "./pages/clientDetails";
import { ClientsAvailable } from "./pages/clientsAvailable";
import ClientLayout from "./component/clientLayout";
import FairyLayout from "./component/fairyLayout";


//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")

    return <BackendURL />;

  return (

    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>

          <Routes>
            <Route>
              <Route element={<Login />} path="/login" />
              <Route element={<Register />} path="/register" />
            </Route>

            <Route element={<ClientLayout />}>
              <Route element={<ClientHome />} path="/" />
              <Route element={<ProductsMenuView />} path="/products/:categoryId" />
              <Route element={<FairySelection />} path="/select-fairy" />
              <Route element={<Payment />} path="/payment/:id" />
            </Route>


            {/* <Route element={<Demo />} path="/demo" /> */}
            {/* <Route element={<FairyDetails />} path="/fairy/details" /> */}
            {/* <Route element={<Single />} path="/single/:theid" /> */}
            <Route element={<FairyLayout />}>
              <Route element={<ClientsAvailable />} path={"/client/select/available"} />
              <Route element={<ClientDetails />} path="/client/details" />
            </Route>
            
            <Route element={<h1>Not found!</h1>} />
          </Routes>

        </ScrollToTop>
      </BrowserRouter>
    </div >
  );
};


export default injectContext(Layout);
