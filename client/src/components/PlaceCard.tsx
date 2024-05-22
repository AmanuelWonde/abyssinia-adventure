import { Card, Rate } from "antd";
import React from "react";

const { Meta } = Card;

const PlaceCard = () => {
  return (
    <Card
      className="m-6 p-2 hover:shadow-2xl border-2"
      hoverable
      style={{ width: "300px", height: "400px" }}
      cover={
        <img
          alt="example"
          src="https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg"
          style={{ height: "220px", objectFit: "cover" }}
        />
      }
    >
      <Meta title="The Nile River" description="Ethiopian Adventure" />
      <div className="mt-2">
        <Rate disabled defaultValue={4} />
        <div className="text-gray-600">Addis Ababa, Ethiopia</div>
      </div>
    </Card>
  );
};

export default PlaceCard;
