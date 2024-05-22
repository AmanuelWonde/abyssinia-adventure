import axios from "axios";
import { useEffect } from "react";


const UseDatabaseConn = () => useEffect(() => {
     // Function to check database connection
    const checkDatabaseConnection = () => {
      axios.get('http://localhost/abyssinia-adventure/server/index.php')
        .then(response => {
          console.log('Server response:', response.data);
          return response.data
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    };

    // Call the function when the component mounts
    checkDatabaseConnection();
},[]);

export default UseDatabaseConn;