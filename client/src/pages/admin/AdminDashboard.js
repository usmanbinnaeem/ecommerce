import { Layout } from "antd";
import AdminSideNav from "../../Components/navbar/AdminSideNav";

const { Header, Content } = Layout;

const AdminDashboard = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <AdminSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
          Dashboard
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Hello Admin Dashboard
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminDashboard;
