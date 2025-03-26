import { Card, Input, Button, Form, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { signUp } from "../store/slices/auth";

const { Title, Text, Link } = Typography;

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(signUp(values));
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3}>Sign Up</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter your name" }]}>
            <Input placeholder="Enter your name" />
          </Form.Item>

          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email", message: "Please enter a valid email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>

          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>

          <Button type="primary" htmlType="submit" block>
            Sign Up
          </Button>

          <Text>
            Already have an account?{" "}
            <Link onClick={() => navigate("/signin")}>Sign In</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Signup;
