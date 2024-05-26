import React from "react";
import Banner from "../components/Banner";
import PlaceCard from "../components/PlaceCard";
import WhyChooseUs from "../components/WhyChooseUs";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <>
      <Banner />
      <WhyChooseUs />

      <div className=" space-y-6">
        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Popular places
          </h1>
          <div className=" w-[80%] flex space-x-4 overflow-x-scroll m-auto overflow-y-hidden">
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
          </div>
        </div>

        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Historical and Cultural Heritage{" "}
          </h1>
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
          </div>
          <Link
            to={""}
            className=" text-themecolor flex justify-end pr-28 text-lg"
          >
            See more historical and cultural heritages
          </Link>
        </div>

        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Natural Wonders and Adventure
          </h1>
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
          </div>
          <Link
            to={""}
            className=" text-themecolor flex justify-end pr-28 text-lg"
          >
            See more nantural wonders and adventure
          </Link>
        </div>

        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Religious and Spiritual Journeys
          </h1>
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard />
            <PlaceCard />
            <PlaceCard />
          </div>
          <Link
            to={""}
            className=" text-themecolor flex justify-end pr-28 text-lg"
          >
            See religious and spiritual journeys
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
