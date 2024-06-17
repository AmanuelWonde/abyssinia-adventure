import React from "react";
import Cookies from "js-cookie";

const Profile = () => {
  const username = Cookies.get("username");
  const isAdmin = username === "emailemail@gmail.com";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
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
                {/* Add more dynamic data or components for admin here */}
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
