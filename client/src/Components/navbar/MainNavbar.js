import { useState } from "react";
import { Menu } from "antd";
import { NavLink } from "react-router-dom";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PersonIcon from "@material-ui/icons/PersonAdd";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./MainNavbar.css";

const { SubMenu, Item } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent({ current: e.key });
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/login");
  };
  return (
    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      <Item key="home">
        {" "}
        <NavLink className="navbar__link" to="/">
          Home
        </NavLink>
      </Item>
      <Item key="shop">
        <NavLink className="navbar__link" to="/shop">
          Shop
        </NavLink>
      </Item>
      {!user && (
        <>
          <Item key="login" icon={<PersonIcon />} className="float-right">
            <NavLink className="navbar__link" to="/login">
              Login
            </NavLink>
          </Item>
          <Item key="register" icon={<PersonAddIcon />} className="float-right">
            <NavLink className="navbar__link" to="/register">
              Register
            </NavLink>
          </Item>
        </>
      )}
      {user && (
        <SubMenu key="SubMenu" title={user.name}>
          <Item key="logout" icon={<ExitToAppIcon />} onClick={logout}>
            Logout
          </Item>
        </SubMenu>
      )}
    </Menu>
  );
};

export default Navbar;
