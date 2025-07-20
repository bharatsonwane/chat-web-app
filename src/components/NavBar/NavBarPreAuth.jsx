import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from "./NavBarElements";
import PropTypes from "prop-types";

function NavBarPreAuth({ children }) {
  return (
    <div>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/updates">Updates</NavLink>
          <NavLink to="/signup">Sign Up</NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to="/signin">Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
      <main 
      >{children}</main>
    </div>
  );
}


NavBarPreAuth.propTypes = {
  children: PropTypes.node,
};

export default NavBarPreAuth;
