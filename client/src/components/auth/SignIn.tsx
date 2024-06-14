import { Button, Form, FormProps, Input } from "antd";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
type FieldType = {
  username?: string;
  password?: string;
};

interface CredentialType {
  username: string;
  password: string;
  remember_me: boolean;
}

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const SignIn = () => {
  const [credential, setcredential] = useState<CredentialType>({
    password: "",
    username: "",
    remember_me: true,
  });

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/auth/signIn.php",
        credential
      );

      if (res.data.success) {
        Cookies.set("user_id", res.data.user_id, { expires: 30 });
        Cookies.set("username", credential.username, { expires: 30 });

        return navigate("/");
      } else {
        return alert(res.data.message);
      }
    } catch (error) {
      alert("Failed to login please try again");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen px-4 lg:px-0">
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        layout="vertical"
        className="w-full max-w-xl bg-slate-100 p-16 rounded-sm"
      >
        <Form.Item<FieldType>
          label="Email"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            onChange={(e) =>
              setcredential({ ...credential, username: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            onChange={(e) =>
              setcredential({ ...credential, password: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" onClick={handleLogin}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignIn;
