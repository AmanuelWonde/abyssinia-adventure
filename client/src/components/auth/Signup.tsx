import { AutoComplete, Button, Form, Input, Select } from "antd";
import "tailwindcss/tailwind.css";
import useFormSubmit, { FormData } from "../../hooks/useFormSubmit";

const { Option } = Select;

const Signup = () => {
  const { setFormData, formData } = useFormSubmit();

  const onFinish = (values: FormData) => {
    setFormData(values);
    console.log(values);
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4 lg:px-0 py-8">
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
            <Input value={formData?.first_name} />
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
            <Input value={formData?.last_name} />
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
            <Input value={formData?.email} />
          </Form.Item>
          <Form.Item
            name="password"
            label="Password"
            rules={[
              {
                type: "string",
                message: "The input is not valid Password!",
              },
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input value={formData?.password} />
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

            <Input value={formData?.country} />
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
              <Input value={formData?.profile_image} />
            </AutoComplete>
          </Form.Item>

          <Form.Item
            name="gender"
            label="Gender"
            rules={[{ required: true, message: "Please select gender!" }]}
          >
            <Select placeholder="Select your gender" value={formData?.gender}>
              <Option value="M">Male</Option>
              <Option value="F">Female</Option>
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
