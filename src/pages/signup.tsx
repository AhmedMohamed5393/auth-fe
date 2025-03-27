import { Card, Input, Button, Form, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { signUp } from "../store/slices/auth";
import { useEffect } from "react";

const { Title, Text, Link } = Typography;

const Signup = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const onFinish = async (values: { name: string; email: string; password: string }) => {
    const result = await dispatch(signUp(values));
    if (signUp.fulfilled.match(result)) {
      message.success("Signup successful");
      navigate("/");
    }
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

          <Button type="primary" htmlType="submit" block loading={loading}>
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
