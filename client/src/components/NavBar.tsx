// import { Layout, Menu } from "antd";

// const { Header } = Layout;

// const NavBar = () => {
//   return (
//     <div className="absolute top-0 left-0 w-full bg-transparent z-10 ">
//       <Header className=" p-4 bg-transparent flex justify-between items-center shadow-md">
//         <div className=" h-full  text-slate-300 text-2xl font-bold p-2 ml-6">
//           Abyssinia Travel
//         </div>
//         <Menu
//           mode="horizontal"
//           color="white"
//           className=" flex justify-between items-center bg-transparent text-white w-[35%] mr-6"
//         >
//           <Menu.Item key="1">
//             <span className=" text-slate-300  font-bold hover:text-white transition-colors duration-200 ">
//               Home
//             </span>
//           </Menu.Item>
//           <Menu.Item key="2">
//             <span className="text-slate-300 font-bold hover:text-white transition-colors duration-200">
//               About
//             </span>
//           </Menu.Item>
//           <Menu.Item key="3">
//             <span className="text-slate-300 font-bold hover:text-white transition-colors duration-200">
//               Post
//             </span>
//           </Menu.Item>
//         </Menu>
//       </Header>
//     </div>
//   );
// };

// export default NavBar;

import React, { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className=" shadow-lg fixed w-full  opacity-65  top-0 right-0  z-50 bg-black/10 backdrop-blur-sm py-4 sm:py-0"
      data-aos="fade-down"
    >
      <div className="max-w-8xl mx-auto px-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-6">
            {/* Logo or Title */}
            <a href="/" className="flex items-center py-4 px-1">
              <span className="font-bold text-black text-3xl hover:text-blue-600 transition-all duration-300">
                Abyssinia Travel
              </span>
            </a>
          </div>
          {/* Primary Navbar items */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="#"
              className="py-2 px-4 text-black text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              Home
            </a>
            <a
              href="#"
              className="py-2 px-4 text-black text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              About
            </a>
            <a
              href="#"
              className="py-2 px-4 text-black text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              Posts
            </a>
            <a
              href="#"
              className="py-2 px-4 text-black text-xl font-[650] hover:text-blue-600 border-b-0 hover:border-b-[1px] border-blue-600 transition-all duration-300"
            >
              Profile
            </a>
          </div>
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="outline-none mobile-menu-button"
            >
              <svg
                className="w-6 h-6 text-gray-700 hover:text-blue-500"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <a
          href="#"
          className="block text-sm px-4 py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="#"
          className="block text-sm px-4 py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
        >
          About
        </a>
        <a
          href="#"
          className="block text-sm px-4 py-2 text-gray-700 font-semibold hover:text-blue-500 transition-colors duration-300"
        >
          Posts
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
