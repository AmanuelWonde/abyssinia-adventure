import { Breadcrumb, Col, Row } from "antd";
import React, { useEffect, useState } from "react";
import { HomeOutlined } from "@ant-design/icons";
import NavBar from "../components/NavBar";
import { PlaceType } from "./PlacesList";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Props {
  place?: PlaceType;
}

const array = [
  "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg",
  "https://plus.unsplash.com/premium_photo-1665972681636-702441bd2d74?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1670552850947-fd19a9a712f8?q=80&w=1915&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1608634193723-1865aa4416ce?q=80&w=1771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const DetailsPage = () => {
  const { id } = useParams();
  const [selectedImage, setImage] = useState(0);
  const [place, setPlace] = useState<PlaceType>();

  useEffect(() => {
    console.log(id);
    const getPlaces = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8000/place/getPlaceById.php?id=${id}`
        );
        if (res.statusText === "OK") {
          console.log(res);
          setPlace(res.data);
        }
      } catch (error) {
        console.log(error);
        alert("Error while fetching places.");
      }
    };
    getPlaces();
  }, []);

  console.log(place);
  return (
    <div>
      <NavBar color="bg-gray-700" />
      <div className="container mx-auto ml-4 px-4 my-2 mt-24">
        <Breadcrumb
          className=" flex justify-start p-2 "
          items={[
            {
              href: "/",
              title: (
                <>
                  <HomeOutlined />
                  <span>Home</span>
                </>
              ),
            },
            {
              title: "Details Page",
            },
          ]}
        />
      </div>
      <h1 className="ml-16 text-2xl p-2 font-semibold">{place?.name}</h1>
      {/* container mx-auto py-2 px-4 my-6  border-2  */}
      <div className="w-full max-w-[1300px] mx-auto p-4 border-2 my-6 rounded-lg shadow-xl">
        <Row gutter={16}>
          <Col span={18}>
            <img
              className="object-cover w-full  rounded mb-2 max-h-[550px] transition-all duration-500"
              src={array[selectedImage]}
              alt="Main"
            />
            <h2 className="m-2 text-xl font-semibold p-1">{place?.name}</h2>
            <p className="m-2 p-1 text-md">{place?.description}</p>
          </Col>
          <Col
            className=" max-h-[550px]  overflow-y-scroll scroll-ml-1 scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-gray-100 transition-all duration-300"
            span={6}
          >
            {/* when mapping change the array to place prop */}
            {place?.images.map((image, index) => (
              <img
                key={index}
                src={image}
                className="object-cover w-full mb-2 hover:translate-y-[2px] transition-all rounded "
                onClick={() => setImage(index)}
              />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsPage;
