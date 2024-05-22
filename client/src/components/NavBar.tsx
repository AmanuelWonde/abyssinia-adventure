import { Layout, Menu } from "antd";

const { Header } = Layout;

const NavBar = () => {
  return (
    <div className="absolute top-0 left-0 w-full bg-transparent z-10 ">
      <Header className=" p-4 bg-transparent flex justify-between items-center shadow-md">
        <div className=" h-full  text-slate-300 text-2xl font-bold p-2 ml-6">
          Abyssinia Travel
        </div>
        <Menu
          mode="horizontal"
          color="white"
          className=" flex justify-between items-center bg-transparent text-white w-[35%] mr-6"
        >
          <Menu.Item key="1">
            <span className=" text-slate-300  font-bold hover:text-white transition-colors duration-200 ">
              Home
            </span>
          </Menu.Item>
          <Menu.Item key="2">
            <span className="text-slate-300 font-bold hover:text-white transition-colors duration-200">
              About
            </span>
          </Menu.Item>
          <Menu.Item key="3">
            <span className="text-slate-300 font-bold hover:text-white transition-colors duration-200">
              Post
            </span>
          </Menu.Item>
        </Menu>
      </Header>
    </div>
  );
};

export default NavBar;
