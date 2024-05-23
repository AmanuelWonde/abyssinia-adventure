import { Breadcrumb, Col, Row } from "antd";
import React from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";

const DetailsPage = () => {
  return (
    <>
      <Breadcrumb
        items={[
          {
            href: "",
            title: <HomeOutlined />,
          },
          {
            href: "",
            title: (
              <>
                <UserOutlined />
                <span>Application List</span>
              </>
            ),
          },
          {
            title: "Application",
          },
        ]}
      />

      <div>
        <Row>
          <Col span={12} className="bg-black">
            col-12
          </Col>
          <Col span={12} className="bg-blue-600">
            col-12
          </Col>
        </Row>
      </div>
    </>
  );
};

export default DetailsPage;
