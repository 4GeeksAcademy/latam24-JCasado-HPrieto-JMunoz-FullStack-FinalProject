import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";
import injectContext from "./store/appContext";

import { Login } from "./pages/login";
import { Register } from "./pages/register";

//------------------------------------------------------------------------------------------------------
import ClientLayout from "./component/clientLayout";
import ClientHome from "./pages/clientsPages/clientHome";
import ProductsMenuView from "./pages/clientsPages/productsMenuView";
import FairySelection from "./pages/clientsPages/selectFairyView";
import Payment from "./pages/clientsPages/payment"

//------------------------------------------------------------------------------------------------------
import FairyLayout from "./component/fairyLayout";
import FairyHome from "./pages/fairyPages/fairyHome";
import FairyMenuView from "./pages/fairyPages/fairyMenuView";
import { ClientsRequest } from "./pages/fairyPages/clientsRequest";



const Layout = () => {

  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")

    return <BackendURL />;

  return (

    <div>
      <BrowserRouter basename={basename}>
        <ScrollToTop>

          <Routes>
            <Route>
              <Route element={<Login />} path="/" />
              <Route element={<Register />} path="/register" />
            </Route>

            <Route element={<ClientLayout />}>
              <Route element={<ClientHome />} path="/client/home" />
              <Route element={<ProductsMenuView />} path="/products/:categoryId" />
              <Route element={<FairySelection />} path="/select-fairy" />
              <Route element={<Payment />} path="/payment/:id" />
            </Route>

            <Route element={<FairyLayout />}>
              <Route element={<FairyHome />} path="/fairy/home" />
              <Route element={<FairyMenuView />} path="/fairy/fairy-products/:categoryId" />
              <Route element={<ClientsRequest />} path="/client/request" />
            </Route>

            <Route element={<h1>Not found!</h1>} />
          </Routes>

        </ScrollToTop>
      </BrowserRouter>
    </div >
  );
};


export default injectContext(Layout);
