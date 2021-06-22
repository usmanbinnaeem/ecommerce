import { useState } from "react";
import { Layout, Menu } from "antd";
import DashboardIcon from '@material-ui/icons/Dashboard';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CategoryIcon from '@material-ui/icons/Category';
import StyleIcon from '@material-ui/icons/Style';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import MoreIcon from '@material-ui/icons/More';
import { Link } from "react-router-dom";
import "./AdminSideNav.css";

const { Sider } = Layout;
const { Item } = Menu;

const AdminSideNav = () => {
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
        <Item key="1" icon={<DashboardIcon />}>
          <Link className="sidebar__link" to="/admin/dashboard">
            {" "}
            Dashboard
          </Link>
        </Item>
        <Item key="2" icon={<MoreIcon />}>
          <Link className="sidebar__link" to="/admin/product">
            {" "}
            Product
          </Link>
        </Item>
        <Item key="3" icon={<AllInboxIcon />}>
          <Link className="sidebar__link" to="/admin/products">
            {" "}
            Products
          </Link>
        </Item>
        <Item key="4" icon={<StyleIcon />}>
          <Link className="sidebar__link" to="/admin/category">
            {" "}
            Categories
          </Link>
        </Item>
        <Item key="5" icon={<CategoryIcon />}>
          <Link className="sidebar__link" to="/admin/sub-category">
            {" "}
            Sub Categories
          </Link>
        </Item>
        <Item key="6" icon={<LoyaltyIcon />}>
          <Link className="sidebar__link" to="/admin/coupon-code">
            {" "}
            Coupons
          </Link>
        </Item>
        <Item key="7" icon={<VisibilityIcon />}>
          <Link className="sidebar__link" to="/user/password">
            {" "}
            Password
          </Link>
        </Item>
      </Menu>
    </Sider>
  );
};

export default AdminSideNav;
