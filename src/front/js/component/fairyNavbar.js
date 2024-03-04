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

  return (

    <nav className="fairy-navbar">
      <div className="container-fluid d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          <img
            className="navbar-img mx-3"
            role="button"
            src={tremyIsotipo}
            onClick={() => navigate("/fairy/home")}
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

          <div className="dropdown">
            <button className="userButton btn btn-light" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              <i className="fa-regular fa-user rounded"></i>
            </button>
            <ul className="fairyDropdown dropdown-menu text-secondary">
              <li><Link to="/fairy/details" className="text-secondary dropdown-item btn">User Profile</Link></li>
              <li><button className="dropdown-item text-secondary" type="button">Account Details</button></li>
              <li><button className="dropdown-item text-secondary" type="button">Service History</button></li>
              <li><button className="dropdown-item text-secondary" type="button">Get Help</button></li>
              <li><p className="fairyDropdownLine">________________________</p></li>
              <li><Link to="/" className="dropdown-item btn">Log Out <i className="fa-solid fa-right-from-bracket"></i>
              </Link></li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};
