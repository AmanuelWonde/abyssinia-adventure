import { Card, Rate } from "antd";
import { PlaceType } from "../pages/PlacesList";

const { Meta } = Card;

interface Props {
  place?: PlaceType;
}

const PlaceCard = ({ place }: Props) => {
  return (
    <Card
      className="m-6 p-2 hover:shadow-2xl border-2"
      hoverable
      style={{ width: "300px", height: "auto" }}
      cover={
        <img
          alt="example"
          // src={place?.images[0].image}
          src="https://www.ethiopianadventuretours.com/application/files/1314/6793/1596/Ethiopian-adventure-tours-waterfall.jpg"
          style={{ height: "220px", objectFit: "cover" }}
        />
      }
    >
      <Meta title="The Nile River" description={place?.description} />
      <div className="mt-2">
        <Rate disabled defaultValue={4} />
        <div className="text-gray-600">
          {place?.location}, {place?.city}
        </div>
      </div>
    </Card>
  );
};

export default PlaceCard;
