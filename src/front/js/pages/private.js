
import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {

    const { store } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
       
        const token = store.token;

        if (!token) {

            alert("Please login or create an account");

            navigate("/");
        }

    }, [store.token, navigate]);

    return (

        <div className="container">

            {store.token ? (
                <h2> Private Route </h2>
            ) : (
                <h2> Go back to Register or Login </h2>
            )}
        </div>
    );
};

export default Private;