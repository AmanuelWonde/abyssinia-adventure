import QualityCard from "./QualityCard";

const WhyChooseUs = () => {
  return (
    <div className="flex flex-col justify-center items-center my-6 p-4">
      <h1 className="text-2xl font-bold m-4 p-2">Why Choose Us?</h1>
      <div className=" grid grid-cols-3 w-[70%] gap-4 m-auto">
        <QualityCard />
        <QualityCard />
        <QualityCard />
      </div>
    </div>
  );
};

export default WhyChooseUs;
