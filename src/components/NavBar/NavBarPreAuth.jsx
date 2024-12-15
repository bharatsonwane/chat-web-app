import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import PropTypes from 'prop-types';

function NavBarPreAuth(props) {
  return (
    <div>
      <Nav>
        <Bars />

        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/updates" activeStyle>
            Updates
          </NavLink>
          <NavLink to="/signup" activeStyle>
            Sign Up
          </NavLink>
          {/* Second Nav */}
          {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
      <main>{props.children}</main>
    </div>
  );
}

NavBarPreAuth.propTypes = {
  children: PropTypes.node,
};

export default NavBarPreAuth;
