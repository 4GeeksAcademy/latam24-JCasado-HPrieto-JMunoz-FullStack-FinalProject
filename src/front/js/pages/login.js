
import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";


export const Login = () => {

    const { store, actions } = useContext(Context);

    const navigate = useNavigate();

    const [data, setData] = useState({});

    const [selectedUser, setSelectedUser] = useState(null);

    const handleChange = (event) => {

        setData({
            ...data,
            [event.target.name]: event.target.value
        });
    };


    const handleUserSelection = (userType) => {

        setSelectedUser(userType);
    };

    return (
        
        <div className="container">
            <div className="row">
                <div className="col mt-3">
                    <label htmlFor="inputEmail" className="form-label">@Email</label>
                    <input type="text" name="email" id="inputEmail" className="form-control" aria-describedby="emailHelpBlock" onChange={handleChange} />
                    <div id="emailHelpBlock" className="form-text">
                        Please use a valid email
                    </div>
                    <label htmlFor="inputPassword5" className="form-label">Password</label>
                    <input type="password" name="password" id="inputPassword5" className="form-control" aria-describedby="passwordHelpBlock" onChange={handleChange} />
                    <div id="passwordHelpBlock" className="form-text">
                        Please use a valid password
                    </div>

                    <div className="mt-3">
                        <label className="form-label">Choose User Type</label>
                        <div className="btn-group" role="group" aria-label="User Type">
                            <button type="button" className={("btn", "btn-primary", { "active": selectedUser === "Client" })} onClick={() => handleUserSelection("Client")}>Client</button>
                            <button type="button" className={("btn", "btn-primary", { "active": selectedUser === "Fairy" })} onClick={() => handleUserSelection("Fairy")}>Fairy</button>
                            <button type="button" className={("btn", "btn-primary", { "active": selectedUser === "Admin" })} onClick={() => handleUserSelection("Admin")}>Admin</button>
                        </div>
                    </div>

                    <button className="btn btn-success mt-4 mb-3" onClick={async () => {
                        if (await actions.makeLogin(data)) {
                            navigate("/private")
                        }
                    }}> Login
                    </button>
                </div>
            </div>
        </div>
    );
};
