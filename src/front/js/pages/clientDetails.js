import React from "react";
import clientPhoto from "../../img/profile_picture.jpg"

export const ClientDetails = () => {
    return (
        <div className="main-container">
            <h2 className="d-flex justify-content-center fw-bold mt-2 mb-3">
                Client Profile
            </h2>
            {/* CARD */}

            <div className="data-card container">

                <div className="row my-3">
                    <div className="col-12 col-lg-3 d-flex justify-content-center mb-3">
                        <img src={clientPhoto} className="rounded-circle profile-picture" />
                    </div>

                    <div className="col-12 col-lg-9">
                        <div className="d-flex justify-content-start">
                            <h3 className="card-title">Client Name</h3>
                        </div>
                        {/* info */}
                        <div>
                            <div>
                                <p>Details...</p>
                            </div>
                            <div>
                                <p>Rate</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="data-container mx-3 mb-3">

                    <h5>About</h5>
                    <p>
                        Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                        Asperiores laudantium labore recusandae suscipit dolorem soluta
                        distinctio eligendi eaque maxime ratione repellat, tempore,
                        perspiciatis dicta cumque! Quas necessitatibus debitis tempore
                        perspiciatis.
                    </p>
                </div>
                {/* reviews card */}
                <div className="mx-3 mb-4">
                    <div className="d-flex justify-content-between">
                        <h5>Reviews</h5>
                        <p className="text-primary" role="button">
                            See all
                        </p>
                    </div>

                    <div className="overflow-auto">
                        <div className="data-card card">
                            <img src="..." className="rounded-circle" />
                            <div className="data-container mx-3 mb-3">
                                <div className="d-flex justify-content-start">
                                    <h3 className="card-title mb-0">Fairy Name</h3>
                                </div>
                                <p className="fw-bold my-1 text-secondary">a day ago</p>
                                <p>
                                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                                    Asperiores laudantium labore recusandae suscipit dolorem.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                {/* location */}
                <div className="mx-3">
                    <h5>Location</h5>
                    <div className="d-flex mx-4 my-3 location">
                        <i className="fa-solid fa-location-dot"></i>
                        <p className="text-secondary mx-3">Doral, Miami, Fl</p>
                    </div>
                </div>
            </div>
        </div>

    )
}