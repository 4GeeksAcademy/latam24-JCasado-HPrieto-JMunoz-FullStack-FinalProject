import React from "react";
import clientAvatar from "../../../img/clientAvatar1.png"
import { Link } from "react-router-dom";


export const ClientsRequest = () => {

    return (

        <div className="main-container">
            <h2 className="d-flex justify-content-center fw-bold mt-2 mb-3">
                Choose your Clients
            </h2>
            
            <div className="data-card container">

                <div className="row my-3">
                    <div className="col-12 col-lg-3 d-flex justify-content-center mb-3">
                        <img src={clientAvatar} className="rounded-circle profile-picture" />
                    </div>

                    <div className="col-10 col-lg-7">
                        <div className="d-flex justify-content-start">
                            <h3 className="card-title">Client Name</h3>
                        </div>
                     
                        <div>
                            <div>
                                <p>Details...</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 col-lg-2 rate">
                        <span>
                            Rate
                        </span>
                        <i className="fa-regular fa-star mx-2 mb-1"></i>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-6 col-lg-4 mb-3 text-primary">
                        <p className="mx-3">
                            ETA 20min
                        </p>
                    </div>
                    <div className="d-flex flex-column col-6 col-lg-4">
                        <span className="text-primary fw-bold d-flex justify-content-center">
                            Requesting now
                        </span>
                        <div className="d-flex justify-content-center">
                            <button className="btn btn-accept-request text-dark w-75 mb-3">
                                Accept Request
                            </button>
                        </div>
                    </div>
                    <div className="col-12 d-flex justify-content-end col-lg-4 d-flex justify-content-center">
                        <Link className="text-black mx-3" to={"/fairy/details"} role="button">
                            About
                        </Link>
                    </div>
                </div>
            </div>
        </div>

    )
}

