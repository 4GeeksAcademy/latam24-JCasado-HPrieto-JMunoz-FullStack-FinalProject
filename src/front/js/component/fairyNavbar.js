import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import tremyIsotipo from "../../img/tremy-isotipo.png";


export const FairyNavbar = () => {

  const { store, actions } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {

    console.log("Navbar");

  }, [store.token]);

  const handleClick = () => {

    if (store.token) {

      actions.logOut();

    } else {

      navigate("/login");
    }
  };

  return (

    <nav className="fairy-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            className="navbar-img mx-3"
            role="button"
            src={tremyIsotipo}
            onClick={() => navigate("/")}
            alt="Tremy Isotipo"
          />

          {store.user && <h5 className="mb-0 mt-2"><strong>Hello {store.user.name}!</strong></h5>}
        </div>

        <div className="d-flex align-items-center">
          {store.token && (
            <>
              <button className="btn mr-3">
                <i className="fa-regular fa-bell"></i>
              </button>
            </>
          )}

          {!store.token && (
            <Link to="/login" role="button" className="btn btn-light btn-log mr-3">
            </Link>
          )}
          <Link to="/register" role="button" className="btn btn-light register-btn">
            <i className="fa-regular fa-user"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};
