import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";
import tremyImageUrl from "../../img/tremy-logo.png";
import "../../styles/home.css";


export const Login = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div className="login">
      <div>
        <div className="image-login">
          <img
            src={tremyImageUrl}
            style={{
              width: "300px",
              height: "auto",
            }}
          />
        </div>
        <div className="">
          <p className="mt-3 mb-2">Create a count</p>
          <label htmlFor="inputEmail" className="form-label my-0">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="inputEmail"
            className="form-control"
            aria-describedby="emailHelpBlock"
            onChange={(event) => {
              handleChange(event);
            }}
          />
          <div id="emailHelpBlock" className="form-text">
            Please use a valid email
          </div>
          <div className="mt-3">
            <label htmlFor="inputPassword5" className="form-label my-0">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="inputPassword5"
              className="form-control"
              aria-describedby="passwordHelpBlock"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Please use a valid password
            </div>
            {/* <div className="mt-3">
              <label className="form-label">Choose User Type</label>
              <div className="btn-group" role="group" aria-label="User Type">
                  <button type="button" className={className("btn", "btn-primary", { "active": selectedUser === "Client" })} onClick={() => handleUserSelection("Client")}>Client</button>
                  <button type="button" className={className("btn", "btn-primary", { "active": selectedUser === "Fairy" })} onClick={() => handleUserSelection("Fairy")}>Fairy</button>
                  <button type="button" className={className("btn", "btn-primary", { "active": selectedUser === "Admin" })} onClick={() => handleUserSelection("Admin")}>Admin</button>
              </div>
            </div> */}
            <div className="d-flex justify-content-center mt-3">
              <button
                className="btn btn-login mb-3"
                onClick={async () => {
                  if (await actions.makeLogin(data)) {
                    navigate("/");
                  }
                }}
              >
                {" "}
                login
              </button>
            </div>
            <div>
              <div className="sing-in mt-5">
                <p>or sing up with</p>
              </div>
              <div className="btns-log mb-3">
                <i className="fa-brands fa-google fs-5" role="button"></i>

                <i
                  className="fa-brands fa-facebook mx-4 fs-5"
                  role="button"
                ></i>

                <i className="fa-brands fa-apple fs-5" role="button"></i>
              </div>
              <div className="count">
                <p>
                  dont have an account?{" "}
                  <Link to={"/register"} className="text-primary">
                    register here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
