import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import ClientHome from "./pages/clientsPages/clientHome";
import ProductsMenuView from "./pages/clientsPages/productsMenuView";
import FairySelection from "./pages/clientsPages/selectFairyView";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import { FairyDetails } from "./pages/clientsPages/fairyDetails";
import { AvailableFairies } from "./pages/clientsPages/availableFairies";

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
          <Navbar />
          <Routes>
            <Route element={<ClientHome />} path="/" />
            <Route element={<ProductsMenuView />} path="/productsMenuView" />
            <Route element={<Demo />} path="/demo" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/register" />
            <Route element={<FairySelection />} path="/select-fairy" />
            <Route element={<AvailableFairies />} path="/fairy/select/available" />
            <Route element={<FairyDetails />} path="/fairy/details" />
            <Route element={<Single />} path="/single/:theid" />
            <Route element={<h1>Not found!</h1>} />

            

          </Routes>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};


export default injectContext(Layout);
