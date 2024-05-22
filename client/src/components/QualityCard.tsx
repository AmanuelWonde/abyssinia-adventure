import { Card } from "antd";
import React from "react";

import { SmileOutlined } from "@ant-design/icons";

const { Meta } = Card;

const QualityCard = () => {
  return (
    <Card
      className="m-6 p-4 hover:shadow-xl border-2"
      hoverable
      style={{
        width: "250px",
        textAlign: "center",
        borderRadius: "20%", // Slightly oval shape
        borderTopLeftRadius: "35%",
        borderBottomRightRadius: "35%",
      }}
    >
      <div className="flex justify-center mb-4">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          {/* You can replace the icon with an image by using <img> tag */}
          <SmileOutlined style={{ fontSize: "48px", color: "#1890ff" }} />
        </div>
      </div>
      <Meta
        title="Diverse Destinations"
        description="Explore a wide variety of destinations with our expert guides."
      />
    </Card>
  );
};

export default QualityCard;
