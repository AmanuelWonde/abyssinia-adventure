import React from "react";
import Banner from "../components/Banner";
import PlaceCard from "../components/PlaceCard";
import WhyChooseUs from "../components/WhyChooseUs";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyChooseUs />
      <PlaceCard />
    </>
  );
};

export default Home;
