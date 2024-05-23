import axios from "axios";
import { useEffect, useState } from "react";

const PlacesList = () => {
  const [placeLists, setPlaceLists] = useState();

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/place/getPlaces.php"
        );
        if (res.statusText === "OK") {
          console.log(res);
          setPlaceLists(res.data.places);
        }
      } catch (error) {
        console.log(error);
        alert("Error while fetching places.");
      }
    };
    getHouses();
  }, []);
  console.log("Places list: ", placeLists);
  return <></>;
};

export default PlacesList;
