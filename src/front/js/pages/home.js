import React, { useContext } from "react";
import { Context } from "../store/appContext";
import tremyImageUrl from "../../img/tremy-logo.png";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <>
      <div className="text-center mt-5 mb-4 d-flex justify-content-center publicity-card">
        <div className="card container publicity-card mx-4">
          <div className="">
            <img src="..." className="img-publicity" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center">
        <div className="card container col-5 mx-2">
          <div className="">
            <img src="..." className="img-publicity" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
        <div className="card container col-5 mx-2">
          <div className="">
            <img src="..." className="img-publicity" alt="..." />
          </div>
          <div className="card-body">
            <h5 className="card-title">Card title</h5>
            <p className="card-text">
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
