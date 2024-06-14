import React from "react";
import Banner from "../components/Banner";
import PlaceCard from "../components/PlaceCard";
import WhyChooseUs from "../components/WhyChooseUs";
import { Link } from "react-router-dom";
import image from "../../public/photo_2024-05-28_10-04-12.jpg";
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
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard image={image} />
            <PlaceCard image={image} />
            <PlaceCard image={image} />
          </div>
          <Link
            to="/get-places/Popular place"
            className=" text-themecolor flex justify-end pr-28 text-lg"
          >
            See more popular places
          </Link>
        </div>

        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Historical and Cultural Heritage{" "}
          </h1>
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard image={image} />
            <PlaceCard image={image} />
            <PlaceCard image={image} />
          </div>
          <Link
            to="/get-places/Historical and Cultural Heritage"
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
            <PlaceCard image={image} />
            <PlaceCard image={image} />
            <PlaceCard image={image} />
          </div>
          <Link
            to="/get-places/Natural Wonders and Adventure"
            className=" text-themecolor flex justify-end pr-28 text-lg"
          >
            See more natural wonders and adventure
          </Link>
        </div>

        <div>
          <h1 className=" text-3xl text-themecolor font-bold text-center">
            Religious and Spiritual Journeys
          </h1>
          <div className=" w-[80%] flex space-x-4 m-auto">
            <PlaceCard image={image} />
            <PlaceCard image={image} />
            <PlaceCard image={image} />
          </div>
          <Link
            to="/get-places/Religious and Spiritual Journeys"
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
