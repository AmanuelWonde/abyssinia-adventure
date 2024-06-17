import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Profile = () => {
  const username = Cookies.get("username");
  const isAdmin = username === "emailemail@gmail.com";
  const [users, setUsers] = useState<any>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isAdmin) {
      // Fetch all users if the logged-in user is an admin
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

      fetchUsers();
    }
  }, [isAdmin]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-semibold text-center mb-4">
          Profile Page
        </h1>
        {username ? (
          <div>
            <p className="text-lg text-center mb-4">Welcome, {username}</p>
            {isAdmin && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <h2 className="text-2xl font-semibold text-center mb-2">
                  Admin Panel
                </h2>
                <p className="text-center">
                  You have administrative privileges.
                </p>
                {error ? (
                  <p className="text-red-500 text-center">{error}</p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border-gray-200 shadow-md rounded-lg overflow-hidden">
                      <thead className="bg-gray-100 text-gray-700">
                        <tr>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Name
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Email
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Country
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Phone
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200">
                            Gender
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-600">
                        {users.map((user: any) => (
                          <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-2 px-4 border-b border-gray-200">
                              {user.first_name} {user.last_name}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {user.email}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {user.country}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {user.phone}
                            </td>
                            <td className="py-2 px-4 border-b border-gray-200">
                              {user.gender}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        ) : (
          <p className="text-lg text-center">
            Please log in to view your profile.
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
