import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Table, Tag, Space } from "antd";
import Navbar from "../components/NavBar";

// Importing Ant Design styles (ensure you have the correct path)
import "antd/dist/reset.css";

interface UserType {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  gender: string;
}

interface PlaceType {
  id: string;
  name: string;
  description: string;
  location: string;
  city: string;
  region: string;
  category: string;
}

const Profile: React.FC = () => {
  const username = Cookies.get("username");
  const isAdmin = username === "emailemail@gmail.com";
  const [users, setUsers] = useState<UserType[]>([]);
  const [places, setPlaces] = useState<PlaceType[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("users");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "http://localhost/abyssinia-adventure/server/Report/getAllUsersReport.php"
        );
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch users.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("An error occurred while fetching users.");
      }
    };

    const fetchPlaces = async () => {
      try {
        const response = await axios.get(
          "http://localhost/abyssinia-adventure/server/Report/getAllPlaces.php"
        );
        if (response.data.success) {
          setPlaces(response.data.data);
        } else {
          setError("Failed to fetch places.");
        }
      } catch (error) {
        console.error("Error fetching places:", error);
        setError("An error occurred while fetching places.");
      }
    };

    if (isAdmin) {
      fetchUsers();
      fetchPlaces();
    }
  }, [isAdmin]);

  const columnsUsers = [
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => (
        <Tag
          color={
            text === "Male" ? "blue" : text === "Female" ? "pink" : "green"
          }
        >
          {text}
        </Tag>
      ),
    },
  ];

  const columnsPlaces = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "City",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
  ];

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <>
      <Navbar color="bg-gray-700" />
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-start items-start py-8 px-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6 pt-10">
              Welcome to the Admin Panel
            </h1>
            {username && (
              <div className="flex items-center mb-6">
                <p className="text-lg text-gray-700 mr-2">Logged in as:</p>
                <span className="text-xl font-semibold text-gray-900 underline">
                  {username}
                </span>
              </div>
            )}

            {isAdmin ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="flex justify-between items-center bg-gray-200 px-4 py-2 mb-4 rounded-lg shadow-md">
                  <button
                    className={` text-base px-4 py-2 rounded-md transition-colors ${
                      selectedOption === "users"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    onClick={() => handleOptionChange("users")}
                  >
                    Show List of All Users
                  </button>
                  <button
                    className={`text-base px-4 py-2 rounded-md transition-colors ${
                      selectedOption === "places"
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-gray-300 text-gray-800 hover:bg-gray-400"
                    }`}
                    onClick={() => handleOptionChange("places")}
                  >
                    Show List of All Places
                  </button>
                </div>

                {selectedOption === "users" ? (
                  <Table
                    dataSource={users}
                    columns={columnsUsers}
                    bordered
                    pagination={{ pageSize: 10 }}
                    key="usersTable"
                  />
                ) : (
                  <Table
                    dataSource={places}
                    columns={columnsPlaces}
                    bordered
                    pagination={{ pageSize: 10 }}
                    key="placesTable"
                  />
                )}
              </div>
            ) : (
              <p className="text-lg mt-4">
                You are not authorized to view this page.
              </p>
            )}
            {error && <p className="text-red-500 mt-4">Error: {error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
