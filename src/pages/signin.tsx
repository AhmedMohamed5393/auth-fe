import { Card, Input, Button, Form, Typography, message } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { signIn } from "../store/slices/auth";
import { useEffect } from "react";

const { Title, Text, Link } = Typography;

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (error) {
      message.error(error);
    }
  }, [error]);

  const onFinish = async (values: { email: string; password: string }) => {
    const result = await dispatch(signIn(values));
    if (signIn.fulfilled.match(result)) {
      message.success("Login successful");
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <Card className="auth-card">
        <Title level={3}>Sign In</Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: "Please enter your email" }]}>
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: "Please enter your password" }]}>
            <Input.Password placeholder="Enter your password" />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Sign In
          </Button>
          <Text>
            Don't have an account?{" "}
            <Link onClick={() => navigate("/signup")}>Sign Up</Link>
          </Text>
        </Form>
      </Card>
    </div>
  );
};

export default Signin;
