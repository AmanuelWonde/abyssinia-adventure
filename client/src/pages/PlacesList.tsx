import axios from "axios";
import { useEffect, useState } from "react";
import PlaceCard from "../components/PlaceCard";
import NavBar from "../components/NavBar";

interface Image {
  image: string;
}
export interface PlaceType {
  id: number;
  description?: string;
  location?: string;
  city?: string;
  images: Image[];
}

const PlacesList = () => {
  const [placeLists, setPlaceLists] = useState<PlaceType[]>();

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await axios.get<PlaceType[]>(
          "http://localhost:8000/place/getPlaces.php"
        );
        if (res.statusText === "OK") {
          console.log(res);
          setPlaceLists(res.data);
        }
      } catch (error) {
        console.log(error);
        alert("Error while fetching places.");
      }
    };
    getHouses();
  }, []);
  console.log("Places list: ", placeLists);
  return (
    <div className="relative">
      <div className=" bg-blue-300">
        <NavBar />
      </div>
      <div className="absolute top-6 my-6">
        <h1 className="font-bold text-2xl p-4 m-6">
          Discover The wonders of Ethiopia.
        </h1>
        <div>
          {placeLists?.map((place) => (
            <PlaceCard place={place} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
