import React, { useEffect, useState } from "react";
import axios from "axios";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  country: string;
  phone: string;
  profile_image: string;
  gender: string;
};

const Report = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<{ success: boolean; data: User[] }>(
          "http://localhost/generate_report.php"
        );
        if (response.data.success) {
          setUsers(response.data.data);
        } else {
          setError("Failed to fetch data");
        }
      } catch (err) {
        setError("An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>User Report</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Country</th>
            <th>Phone</th>
            <th>Profile Image</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.email}</td>
              <td>{user.country}</td>
              <td>{user.phone}</td>
              <td>
                <img
                  src={user.profile_image}
                  alt="Profile"
                  width="50"
                  height="50"
                />
              </td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Report;
