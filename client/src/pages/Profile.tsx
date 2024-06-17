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

const Profile: React.FC = () => {
  const username = Cookies.get("username");
  const isAdmin = username === "emailemail@gmail.com";
  const [users, setUsers] = useState<UserType[]>([]);
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

    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: UserType) => (
        <Space size="middle">
          {record.first_name} {record.last_name}
        </Space>
      ),
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

  return (
    <>
      <Navbar color="bg-gray-700" />
      <div className="min-h-screen bg-gray-100">
        <div className="flex justify-start items-start py-8 px-4">
          <div className="w-full max-w-screen-xl mx-auto">
            <h1 className="text-3xl font-semibold mb-4 pt-10">
              Welcome to the Admin Panel
            </h1>
            {username && (
              <p className="text-lg mb-4">
                Logged in as:{" "}
                <span className="text-2xl font-bold text-gray-800">
                  {username}
                </span>
              </p>
            )}
            {isAdmin ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <Table
                  dataSource={users}
                  columns={columns}
                  bordered
                  pagination={{ pageSize: 10 }} // Adjust page size as needed
                />
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
