import React from "react";
import '../tailwind.css'; 
import Header from "../Components/HomePage/Header";
import Body from "../Components/HomePage/Body";
import Footer from "../Components/HomePage/Footer";

const Homepage: React.FC = () => {
  return (
    <div>
      <Header />
      <Body />
      <Footer />
    </div>
  );
};

export default Homepage;
