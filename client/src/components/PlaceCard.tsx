import { Card, Rate } from "antd";
import { PlaceType } from "../pages/PlacesList";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface Props {
  place?: PlaceType;
  image: string;
}

const PlaceCard = ({ place, image }: Props) => {
  return (
    <Card
      className="m-6 p-2 hover:shadow-2xl border-2 min-w-fit"
      hoverable
      style={{ width: "300px", height: "auto" }}
      cover={
        <img
          alt="example"
          // src={place?.images[0].image}
          src={image}
          style={{ height: "220px", objectFit: "cover" }}
        />
      }
    >
      <Link to={`/details-page/${place?.id}`}>
        <Meta title={place?.name} description={place?.description} />
        <div className="mt-2">
          <Rate disabled defaultValue={4} />
          <div className="text-gray-600">
            {place?.location}, {place?.city}
          </div>
        </div>
      </Link>
    </Card>
  );
};

export default PlaceCard;
