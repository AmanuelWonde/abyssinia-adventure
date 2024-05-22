import React from "react";
import { Button, Layout, Menu } from "antd";
import { Content } from "antd/es/layout/layout";
import NavBar from "./NavBar";
import { ReactTyped } from "react-typed";

const bgImage =
  "https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg";

const Banner = () => {
  return (
    <Layout
      className="relative h-[550px] bg-cover bg-center"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <NavBar />
      <Content className="flex flex-col items-start justify-center h-full text-center text-slate-300 p-6 bg-black bg-opacity-40">
        <div className="absolute flex flex-col justify-center items-start text-slate-300 p-6 md:ml-10">
          <ReactTyped
            strings={["Find your special tour today"]}
            typeSpeed={30}
            // backSpeed={35}
            startDelay={200}
            startWhenVisible
            className="text-4xl md:text-6xl font-bold mb-4"
          />

          <ReactTyped
            strings={["With Abyssinia Travels"]}
            typeSpeed={30}
            startDelay={300}
            startWhenVisible
            className="text-lg mb-6"
          />

          <Button
            type="primary"
            size="large"
            className="shadow-lg transition-transform transform hover:scale-105"
          >
            View Tours
          </Button>
        </div>
      </Content>
    </Layout>
  );
};

export default Banner;
