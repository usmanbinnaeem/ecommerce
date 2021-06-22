import { useState } from "react";
import { Layout, Menu } from "antd";
import { HistoryOutlined, EyeOutlined } from "@ant-design/icons";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import { Link } from "react-router-dom";
import "./UserSideNav.css";

const { Sider } = Layout;
const { Item } = Menu;

const UserSideNav = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [current, setCurrent] = useState("1");

  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <Sider
      style={{ backgroundColor: "white" }}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
    >
      <Menu
        theme="light"
        onClick={handleClick}
        selectedKeys={[current]}
        mode="inline"
      >
        <Item key="1" icon={<HistoryOutlined />}>
          <Link className="sidebar__link" to="/user/history">
            {" "}
            History
          </Link>
        </Item>
        <Item key="2" icon={<EyeOutlined />}>
          <Link className="sidebar__link" to="/user/password">
            {" "}
            Password
          </Link>
        </Item>
        <Item key="3" icon={<FavoriteBorderIcon />}>
          <Link className="sidebar__link" to="/user/wishlist">
            {" "}
            Wishlist
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default UserSideNav;
