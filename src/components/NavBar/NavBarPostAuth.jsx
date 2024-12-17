import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import PropTypes from 'prop-types';

function NavBarPostAuth(props) {
  return (
    <div>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/dashboard">Dashboarddd</NavLink>
          <NavLink to="/chat" activeStyle>
            Chat
          </NavLink>
          {/* <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink> */}
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/">Sign out</NavBtnLink>
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
