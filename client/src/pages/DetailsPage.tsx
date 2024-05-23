import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import { HomeOutlined } from "@ant-design/icons";
import NavBar from "../components/NavBar";
import { PlaceType } from "./PlacesList";

interface Props {
  place?: PlaceType;
}

const array = [
  "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg",
  "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg",
  "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg",
];

const DetailsPage = ({ place }: Props) => {
  return (
    <div className="relative">
      <NavBar />
      <div className="absolute top-16">
        <Breadcrumb
          className="my-4 flex justify-end right-1 mx-4 p-2 "
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
      <div className="my-6 p-4 absolute top-24 ">
        <Row gutter={16}>
          <Col span={18}>
            <img
              className="object-cover w-full rounded"
              src={
                "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg"
              }
              alt="Main"
            />
          </Col>
          <Col span={6}>
            {/* when mapping change the array to place prop */}
            {array.map((image, index) => (
              <img
                key={index}
                src={image}
                className="object-cover w-full mb-2 hover:translate-y-[2px] transition-all rounded"
                alt={`Image ${index}`}
              />
            ))}
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default DetailsPage;
