import Masonry from "react-masonry-css";
// import { placeLists } from "../assets/PlaceListTestFile";
import NavBar from "../components/NavBar";
import PlaceCard from "../components/PlaceCard";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export interface PlaceType {
  name: string;
  id: number;
  description?: string;
  location?: string;
  city?: string;
  images: string[];
}

const breakpointColumnsObj = {
  default: 4,
  1100: 5,
  700: 3,
  500: 2,
};

const PlacesList = () => {
  const [placeLists, setPlaceLists] = useState<PlaceType[]>();
  const { category } = useParams();
  const extractImageName = (path: string) => {
    // Split the path by '/'
    const parts = path.split("/");
    // Get the last part, which is the image name
    const name = parts[parts.length - 1];
    return name;
  };
  console.log(category);

  useEffect(() => {
    const getHouses = async () => {
      try {
        const res = await axios.get(
          `http://localhost/abyssinia-adventure/server/place/getPlaces.php?category=${category}`
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

  return (
    <div className="">
      <NavBar color="bg-gray-700 " />

      <div className=" container mx-auto ml-4 px-4 my-2 mt-24">
        <h1 className="text-2xl p-4 m-6 text-center font-bold text-blue-600">
          {category}
        </h1>

        <div className="flex justify-center mx-14 w-full">
          <Masonry
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
          >
            {placeLists?.map((place) => (
              <PlaceCard
                place={place}
                image={
                  "http://localhost:8000/public/place_images/" +
                  extractImageName(place.images[0])
                }
              />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
