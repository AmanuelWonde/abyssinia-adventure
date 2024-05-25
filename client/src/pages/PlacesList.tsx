import Masonry from "react-masonry-css";
import { placeLists } from "../assets/PlaceListTestFile";
import NavBar from "../components/NavBar";
import PlaceCard from "../components/PlaceCard";

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

const breakpointColumnsObj = {
  default: 4,
  1100: 5,
  700: 3,
  500: 2,
};

const PlacesList = () => {
  // const [placeLists, setPlaceLists] = useState<PlaceType[]>();

  // useEffect(() => {
  //   const getHouses = async () => {
  //     try {
  //       const res = await axios.get<PlaceType[]>(
  //         "http://localhost:8000/place/getPlaces.php"
  //       );
  //       if (res.statusText === "OK") {
  //         console.log(res);
  //         setPlaceLists(res.data);
  //       }
  //     } catch (error) {
  //       console.log(error);
  //       alert("Error while fetching places.");
  //     }
  //   };
  //   getHouses();
  // }, []);
  console.log("Places list: ", placeLists);

  return (
    <div className="">
      <NavBar />

      <div className=" container mx-auto ml-4 px-4 my-2 mt-24">
        <h1 className="font-semibold text-2xl p-4 m-6">
          Discover The wonders of Ethiopia.
        </h1>

        <div className="flex justify-center mx-14 w-full">
          <Masonry
            className="my-masonry-grid "
            columnClassName="my-masonry-grid_column"
            breakpointCols={breakpointColumnsObj}
          >
            {placeLists?.map((place) => (
              <PlaceCard place={place} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default PlacesList;
