import { AutoComplete, Button, Form, Input, Select } from "antd";
import "tailwindcss/tailwind.css";
import useFormSubmit, { FormData } from "../../hooks/useFormSubmit";

const { Option } = Select;

const Signup = () => {
  const { setFormData, loading, error } = useFormSubmit();

  const onFinish = (values: FormData) => {
    setFormData(values);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 lg:px-0">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
        <Form
          name="register"
          layout="vertical"
          initialValues={{ remember: true }}
          scrollToFirstError
          onFinish={onFinish}
        >
          <Form.Item
            name="first_name"
            label="First Name"
            rules={[
              {
                required: true,
                message: "First Name is required!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="last_name"
            label="Last Name"
            rules={[
              {
                required: true,
                message: "Last Name is required!",
                whitespace: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your E-mail!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="country"
            label="Country"
            rules={[
              {
                required: true,
                message: "Please select your country of residence!",
              },
            ]}
          >
            {/* <Cascader /> */}

            <Input />
          </Form.Item>

          <Form.Item
            name="phone"
            label="Phone Number"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item
            name="profile_image"
            label="Profile Image"
            rules={[
              {
                required: true,
                message: "Please insert a URL for your profile picture",
              },
            ]}
          >
            <AutoComplete placeholder="URL">
              <Input />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="Select your gender">
              <Option value="male">Male</Option>
              <Option value="female">Female</Option>
              <Option value="other">Other</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
