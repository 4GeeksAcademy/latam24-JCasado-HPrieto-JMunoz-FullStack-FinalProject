import React from "react";
import clientPhoto from "../../img/client_profile_photo.jpg"
import { Link } from "react-router-dom";

export const ClientsAvailable = () => {
    return (
        <div className="main-container">
            <h2 className="d-flex justify-content-center fw-bold mt-2 mb-3">
                Choose your Clients
            </h2>
            {/*FAIRY CARD */}
            <div className="data-card container">

                <div className="row my-3">
                    <div className="col-12 col-lg-3 d-flex justify-content-center mb-3">
                        <img src={clientPhoto} className="rounded-circle profile-picture" />
                    </div>

                    <div className="col-10 col-lg-7">
                        <div className="d-flex justify-content-start">
                            <h3 className="card-title">Client Name</h3>
                        </div>
                        {/* info */}
                        <div>
                            <div>
                                <p>Details...</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-2 col-lg-1 rate">
                        <div className="d-flex align-items-center w-100 btn">
                            <span>Rate</span>
                            <i className="fa-regular fa-star mx-2 mb-1"></i>
                        </div>
                    </div>
                </div>
                {/* Rate Button */}
                <div className="data-container-fairy mx-3 mb-3 text-primary">
                    <p className="client-distance">
                        ETA 20min
                    </p>
                    <button className="btn btn-success text-dark">
                        Accept reqquest
                    </button>
                </div>
                <Link to={"/fairy/details"}>
                    <p className="text-black">
                        About
                    </p>
                </Link>
            </div>
        </div>

    )
}