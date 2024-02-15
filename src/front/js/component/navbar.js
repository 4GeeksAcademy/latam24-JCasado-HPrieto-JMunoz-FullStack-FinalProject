import React, { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";
import tremyIsotipo from "../../img/tremy-isotipo.png";

export const Navbar = () => {
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
    <nav className="navbar">
      <div className="container-fluid d-flex">
        <img
          className="navbar-img mx-3"
          role="button"
          src={tremyIsotipo}
          onClick={() => navigate("/")}
        ></img>

        <div className="ml-auto">
          {store.token ? (
            <button className="btn btn-log" onClick={handleClick}>
              Logout
            </button>
          ) : (
            <Link to="/login">
              <button className="btn btn-log">Login</button>
            </Link>
          )}
          <Link to="/register">
            <button className="btn btn-secondary mx-4 register-btn">
              <i class="fa-solid fa-user"></i>
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};
