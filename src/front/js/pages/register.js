import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import registerImage from "../../img/tremy-logo.png";


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

    <div className="main-container row">
      <div className="col-12 w-75 mx-auto">
        <div className="form mt-5 mb-4">
          <div className="image-login mt-3">
            <img src={registerImage} className="registerLogo" />
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
              id="inputSurname"
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
              name="date_of_birth"
              id="inputDateOfBirth"
              className="form-control"
              aria-describedby="dateOfBirthHelpBlock"
              onChange={handleChange}
            />
            <div id="passwordHelpBlock" className="form-text">
              Please enter your date of birth
            </div>
          </div>

          <div className="mt-2">
            <label htmlFor="" className="form-label">State</label>
            <select className="form-select" aria-label="Default select example" name="address" onChange={handleChange}>
              <option>Pick a state</option>
              <option value="Arizona">Arizona</option>
              <option value="California">California</option>
              <option value="Florida">Florida</option>
              <option value="Wyoming">Wyoming</option>
            </select>
          </div>

          <div className="mt-2">
            <label htmlFor="userRole" className="form-label">Role</label>
            <select className="form-select" aria-label="Default select example" name="role" onChange={handleChange}>
              <option>Pick your role</option>
              <option value="CLIENT">Client</option>
              <option value="FAIRY">Fairy</option>
            </select>
          </div>

          <div className="mt-2">
            <label htmlFor="phone" className="form-label">phone</label>
            <input className="form-control" id="phone" type="number" name="phone" placeholder="Your phone number here" onChange={handleChange} />
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
          <div className="d-flex flex-column justify-content-center align-items-center">
            <p className="mt-3 mx-2 check-box">
              <input type="checkbox" required className="checkbox"></input>I agree
              with
              <a className="text-primary"> Terms & Conditions</a>
            </p>

            <button
              className="btn btn-register mb-5"

              onClick={() => {

                if (actions.newUser(data)) {

                  navigate("/");
                }
              }}
            >
              {" "}
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
