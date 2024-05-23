import axios from "axios";
import { useEffect } from "react";
import baseUrl from "../services/base-url";


const UseDatabaseConn = () => useEffect(() => {
     // Function to check database connection
    const checkDatabaseConnection = () => {
      axios.get(`${baseUrl}/index.php`)
        .then(response => {
          console.log('Server response:', response.data);
          return response.data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    // Call the function when the component mounts
   return checkDatabaseConnection();
},[]);

export default UseDatabaseConn;