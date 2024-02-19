import React from "react";
import fairyPhoto from "../../../img/profile_picture.jpg"

export const FairyDetails = () => {
  return (
    <div className="main-container">
      <h2 className="d-flex justify-content-center fw-bold mt-2 mb-3">
        Fairy Profile
      </h2>
      {/* CARD */}

      <div className="data-card container">

        <div className="row my-3">
          <div className="col-12 col-lg-3 d-flex justify-content-center mb-3">
            <img src={fairyPhoto} className="rounded-circle profile-picture" />
          </div>

          <div className="col-12 col-lg-9">
            <div className="d-flex justify-content-start">
              <h3 className="card-title">Ororo Munroe</h3>
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
                  <h3 className="card-title mb-0">Client Name</h3>
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
      <div className="data-card container mt-3">
        <div className="d-flex justify-content-center">
          <div className="datepicker">
            <div className="datepicker-top">
              <div className="btn-group d-flex justify-content-center">
                <button className="tag">Today</button>
                <button className="tag">Tomorrow</button>
                <button className="tag">In 2 days</button>
              </div>
              <div className="month-selector">
                <button className="arrow">
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <span className="month-name">December 2020</span>
                <button className="arrow">
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="datepicker-calendar">
              <span className="day">Mo</span>
              <span className="day">Tu</span>
              <span className="day">We</span>
              <span className="day">Th</span>
              <span className="day">Fr</span>
              <span className="day">Sa</span>
              <span className="day">Su</span>
              <button className="date faded">30</button>
              <button className="date">1</button>
              <button className="date">2</button>
              <button className="date">3</button>
              <button className="date">4</button>
              <button className="date">5</button>
              <button className="date">6</button>
              <button className="date">7</button>
              <button className="date">8</button>
              <button className="date current-day">9</button>
              <button className="date">10</button>
              <button className="date">11</button>
              <button className="date">12</button>
              <button className="date">13</button>
              <button className="date">14</button>
              <button className="date">15</button>
              <button className="date">16</button>
              <button className="date">17</button>
              <button className="date">18</button>
              <button className="date">19</button>
              <button className="date">20</button>
              <button className="date">21</button>
              <button className="date">22</button>
              <button className="date">23</button>
              <button className="date">24</button>
              <button className="date">25</button>
              <button className="date">26</button>
              <button className="date">27</button>
              <button className="date">28</button>
              <button className="date">29</button>
              <button className="date">30</button>
              <button className="date">31</button>
              <button className="date faded">1</button>
              <button className="date faded">2</button>
              <button className="date faded">3</button>
            </div>
          </div>

        </div>
      </div>
    </div>

  );
};
