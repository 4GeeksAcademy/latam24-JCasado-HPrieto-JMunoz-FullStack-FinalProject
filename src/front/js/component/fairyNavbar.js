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
            <div className="container-fluid d-flex">
                <img
                    className="navbar-img mx-3"
                    role="button"
                    src={tremyIsotipo}
                    onClick={() => navigate("/")}
                ></img>

                <div className="ml-auto">
                    {store.token ? (
                        <>
                            <button className="btn">
                                <i class="fa-solid fa-bell"></i>
                            </button>
                            <i class="fa-solid fa-bell"></i>
                            <button className="btn btn-log" onClick={handleClick}>
                                <i className="fa-solid fa-right-to-bracket"></i>
                            </button>
                        </>
                    ) : (
                        <Link to="/login" role="button" className="btn btn-dark btn-log">
                            <i className="fa-solid fa-user"></i>
                        </Link>
                    )}
                    <Link to="/register" role="button" className="btn btn-dark mx-4 register-btn">
                        <i className="fa-solid fa-user"></i>
                    </Link>
                </div>
            </div>
        </nav>
    );
};
