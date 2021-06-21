import { Layout } from "antd";
import UserSideNav from "../../Components/navbar/UserSideNav";

const { Header, Content } = Layout;

const Wishlist = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <UserSideNav />
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{ padding: 0, backgroundColor: "white" }}
        >
        User Wishlist
        </Header>
        <Content style={{ margin: "0 16px" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, minHeight: 360 }}
          >
            Hello Wishlist
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Wishlist;
