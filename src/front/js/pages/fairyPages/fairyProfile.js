import React, { useEffect, useState } from "react";
import fairyPhoto from "../../../img/selinaKyle.png";

const FairyProfile = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getClientProfile(); // Assuming you have a function to fetch the client profile data
        setProfileData(data);
      } catch (error) {
        console.error("Error fetching client profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="main-container">
      {profileData ? (
        <>
          <h2 className="d-flex justify-content-center fw-bold mt-2 mb-3">
            Fairy Profile
          </h2>
          {/* CARD */}
          <div className="data-card container">
            <div className="row my-3">
              <div className="col-12 col-lg-3 d-flex justify-content-center mb-3">
                <img src={fairyPhoto} className="rounded-circle profile-picture" alt="Fairy Photo" />
              </div>
              <div className="col-12 col-lg-9">
                <div className="d-flex justify-content-start">
                  <h3 className="card-title">{profileData.name}</h3>
                </div>
                {/* info */}
                <div>
                  <div>
                    <p>Email: {profileData.email}</p>
                    {/* Add more profile data fields here */}
                  </div>
                  <div>
                    <p>Rating: {profileData.rating}</p>
                    {/* Add more profile data fields here */}
                  </div>
                </div>
              </div>
            </div>
            {/* Add more profile sections here */}
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default FairyProfile;