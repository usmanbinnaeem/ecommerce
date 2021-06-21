import { Layout } from "antd";
import UserSideNav from "../../Components/navbar/UserSideNav";

const { Header, Content } = Layout;

const History = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
        History
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Hello User History
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default History;
