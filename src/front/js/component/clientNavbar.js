import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import tremyIsotipo from "../../img/tremy-isotipo.png";


export const ClientNavbar = () => {

  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {

    console.log("Navbar");

  }, [store.token]);

  return (

    <nav className="client-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            className="navbar-img mx-3"
            role="button"
            src={tremyIsotipo}
            onClick={() => navigate("/client/home")}
            alt="Tremy Isotipo"
          />

          {store.user && <h5 className="mb-0 mt-2"><strong>Hello {store.user.name}!</strong></h5>}
        </div>

        <div className="d-flex align-items-center">
          {store.token && (
            <>
              <button className="notificationBell btn mr-3">
                <i className="fa-regular fa-bell"></i>
              </button>
            </>
          )}

          <button className="userButton btn btn-light">
            <i className="fa-regular fa-user"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};