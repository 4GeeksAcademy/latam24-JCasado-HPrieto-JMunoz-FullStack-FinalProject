import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import profile_picture from "../../img/profilephoto.jpg";
import backgroundRegister from "../../img/backgroundRegister.png";
import "../../styles/home.css";


export const Register = () => {

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
    <div className="register row">
      <div className="register-form col-12 col-lg-6 d-flex justify-content-center p-0">
        <div>
          <div className="image-login mt-3">
            <img src={profile_picture} className="image-profile" />
          </div>

          <div className="mt-0">
            <label htmlFor="inputName" className="form-label my-0">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="inputName"
              className="form-control"
              aria-describedby="nameHelpBlock"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <div id="nameHelpBlock" className="form-text">
              Name
            </div>
          </div>

          <div className="mt-0">
            <label htmlFor="inputName" className="form-label my-0">
              Surname
            </label>
            <input
              type="text"
              name="surname"
              id="inputName"
              className="form-control"
              aria-describedby="nameHelpBlock"
              onChange={(event) => {
                handleChange(event);
              }}
            />
            <div id="nameHelpBlock" className="form-text">
              Surname
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="inputEmail" className="form-label">
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
              Please enter your email address
            </div>
          </div>
          <div className=" mt-2">
            <label htmlFor="inputDateOfBirth" className="form-label">
              Date of birth
            </label>

            <input
              type="date"
              name="Date_of_birth"
              id="inputDateOfBirth"
              className="form-control"
              aria-describedby="dateOfBirthHelpBlock"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Please enter your date of birth
            </div>
          </div>

          {/* <div className="mt-2">
            <label for="" className="form-label">State</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Pick a state</option>
              <option value="1">Arizona</option>
              <option value="2">California</option>
              <option value="3">Florida</option>
              <option value="4">Wyoming</option>
            </select>
          </div> */}


          <div className="mt-2">
            <label for="" className="form-label">Role</label>
            <select className="form-select" aria-label="Default select example">
              <option selected>Pick your role</option>
              <option value="1">Client</option>
              <option value="2">Fairy</option>
              <option value="3">Admin</option>
            </select>
          </div>

          <div className="mt-2">
            <label htmlFor="inputPassword5" className="form-label">
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
              Please enter a valid password
            </div>
          </div>

          <p className="mt-3 mx-2 check-box">
            <input type="checkbox" required className="checkbox"></input>I agree
            with
            <a className="text-primary"> Terms & Conditions</a>
          </p>

          <button
            className="btn btn-register mb-5"
            onClick={async () => {
              if (await actions.newUser(data)) {
                navigate("/Login");
              }
            }}
          >
            {" "}
            Submit
          </button>
          <div className="pb-5"></div>
        </div>
      </div>

      <div
        className="register-image col-6"
        ></div>
        <img src={backgroundRegister}></img>
    </div>

  )
}
