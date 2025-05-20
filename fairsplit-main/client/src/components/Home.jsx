import React, { useState, useEffect } from "react";
import HouseMates from "../assets/HouseMates.webp";
import Partner from "../assets/Partner.webp";
import Everyone from "../assets/Everyone.webp";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const Home = () => {
  const items = [
    {
      text: "with housemates",
      color: "#8656CD",
      image: HouseMates,
      backgroundColor: "#D1B6F1",
    }, 
    {
      text: "with your partner",
      color: "#A6002F",
      image: Partner,
      backgroundColor: "#F4A2B3",
    }, 
    {
      text: "with everyone!",
      color: "#1CC29F",
      image: Everyone,
      backgroundColor: "#A6F3D6",
    }, 
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
        setFade(true);
      }, 500);
      console.log(2);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      {Cookies.get("user") !== undefined ? (
        (window.location.href = "/dashboard")
      ) : (
        <div
          className="min-h-screen flex justify-center items-center bg-green-100"
          // style={{
          //   background: items[currentIndex].backgroundColor,              //  < ----- try these
          //   transition: "background-color 1s ease",
          // }}
        >
          <div className="text-center w-6/12">
            <h1 className="text-6xl">Less stress when </h1>
            <h1 className="text-6xl">sharing expenses </h1>

            {/* Text with transition */}
            <h1
              className="text-6xl"
              style={{
                color: items[currentIndex].color,
                opacity: fade ? 1 : 0, // apply opacity...
                transition: "opacity 1s ease",
              }}
            >
              {items[currentIndex].text}
            </h1>

            <div>
              <p className="w-5/12 text-center ml-48 mt-4 mb-8">
                Keep track of your shared expenses and balances with housemates,
                trips, groups, friends, and family.
              </p>

              <Link
                to={"/register"}
                style={{
                  background: items[currentIndex].color,
                  color: "white",
                  padding: "16px 60px",
                  fontSize: "18px",
                  borderRadius: "6px",
                  transition: "background-color 1s ease",
                }}
              >
                Sign up
              </Link>
            </div>
          </div>

          {/* Image with transition */}
          <div className="w-6/12">
            <img
              src={items[currentIndex].image}
              alt="Split"
              style={{
                width: "440px",
                height: "440px",
                marginBottom: "20px",
                opacity: fade ? 1 : 0,
                transition: "opacity 1s ease",
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
