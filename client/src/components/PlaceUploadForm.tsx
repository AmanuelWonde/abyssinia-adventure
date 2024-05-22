import { Input, Form } from "antd";
import TextArea from "antd/es/input/TextArea";

const PlaceUploadForm = () => {
  return (
    <div className=" space-y-6 w-[50%] p-6">
      <div className=" flex space-x-6">
        <Form.Item label="Place name">
          <Input placeholder="Basic usage" />
        </Form.Item>
        <Form.Item label="Place name">
          <Input placeholder="Basic usage" />
        </Form.Item>
        <Form.Item label="Place name">
          <Input placeholder="Basic usage" />
        </Form.Item>
      </div>
      <div className="">
        <Form.Item label="Place name">
          <TextArea rows={4} placeholder="maxLength is 6" maxLength={6} />
        </Form.Item>
      </div>
      <div className=" flex space-x-6">
        <Form.Item label="Place name">
          <Input placeholder="Basic usage" />
        </Form.Item>

        <Form.Item label="Place name">
          <Input placeholder="Basic usage" />
        </Form.Item>
      </div>
    </div>
  );
};

export default PlaceUploadForm;
