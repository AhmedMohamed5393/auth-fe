import { Card, Input, Button, Form, Typography } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../store";
import { signIn } from "../store/slices/auth";

const { Title, Text, Link } = Typography;

const Signin = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    dispatch(signIn(values));
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
          <Button type="primary" htmlType="submit" block>
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
