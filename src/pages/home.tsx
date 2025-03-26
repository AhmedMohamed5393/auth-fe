import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store";
import { logout } from "../store/slices/auth";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Typography, Spin } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const { Content } = Layout;
const { Title } = Typography;

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/signin");
  };

  if (!token) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Spin size="large" />
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <Layout style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Content style={{ textAlign: "center", background: "#fff", padding: "30px", borderRadius: "10px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Title level={2}>Welcome to the application</Title>
        <Button type="primary" danger icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Button>
      </Content>
    </Layout>
  );
};

export default Home;
