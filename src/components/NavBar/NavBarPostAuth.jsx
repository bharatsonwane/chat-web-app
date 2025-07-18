import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import PropTypes from "prop-types";

function NavBarPostAuth(props) {
  return (
    <div style={{position:"fixed",width:"100vw",}}>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/chat" activeStyle>
            Chat
          </NavLink>
          <NavLink to="/profile" activeStyle>
            profile
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signout">Sign out</NavBtnLink>
        </NavBtn>
      </Nav>
      <main>{props.children}</main>
    </div>
  );
}

NavBarPostAuth.propTypes = {
  children: PropTypes.node,
};

export default NavBarPostAuth;
