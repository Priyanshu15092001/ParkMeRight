//import React from "react";
import React from "react";
import "../About.css";

const About = () => {
  return (
    <div className="aboutimage pic">
      <h1 style={{ textAlign: "center", marginTop: "100px" }}>About Us</h1>
      <div className="AboutBox ">
        <p>
          {" "}
          <b>
            A ‘ParkMe Right’ system is an online service provided via web
            application for ensuring that users can pre-book their parking slots
            of any shopping mall, restaurant, college, hotels etc. at any time
            from anywhere with ease. Its main objective is to manage the details
            of Parking Slots availability and to help users to park their
            vehicles right. This in turn will reduce traffic congestion and time
            for finding a parking slot. With the increase in population and
            vehicles in our day-to-day life ‘ParkMe Right’ will show a greater
            chance to the user to park their vehicle in an available parking
            slot. This application can be developed further in the upcoming
            future for a wide area so that it can help people on a large scale.
            In future this application can be implemented on the existing
            operating systems like ios and windows. And also add some more
            features along with the existing one to make it more compatible and
            user friendly.
          </b>
        </p>
      </div>
    </div>
  );
};

export default About;
