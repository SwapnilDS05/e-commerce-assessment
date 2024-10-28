import _ from "lodash";
import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { clearLocalStorage } from "../../utils/commonMethods";

const MenuContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #333;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1.5rem;
  @media (min-width: 769px) {
    display: flex !important;
  }

  @media (max-width: 768px) {
    position: absolute;
    left: 0;
    right: 0;
    top: 64px;
    z-index: 99999;
    display: flex;
    flex-direction: column;
    background: #333;
    text-align: center;
    padding: 10px 0 35px;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  transition: color 0.3s;

  &:hover {
    color: #ddd;
  }
`;

const ToggleMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;

  @media (max-width: 768px) {
    display: block;
    position: absolute;
    right: 10px;
  }
`;

const TopMenu = () => {
  const [isMenuOpen, setMenuOpen] = React.useState(false);
  const userData = window.localStorage.getItem("accessToken");

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handleLogout = () => {
    toast.success('Logged out successfully!');
    setTimeout(() => {      
      clearLocalStorage();
    }, 1000);
  }

  return (
    <MenuContainer>
      <Logo>
        <NavLink href="/">Logo</NavLink>
      </Logo>
      {!_.isEmpty(userData) && (
        <>
          <ToggleMenuButton onClick={toggleMenu}>
            {isMenuOpen ? "✖" : "☰"}
          </ToggleMenuButton>
          <Nav style={{ display: isMenuOpen ? "flex" : "none" }}>
            <NavLink href="/my-account">My Account</NavLink>
            <NavLink href="#" onClick={handleLogout}>Logout</NavLink>
          </Nav>
        </>
      )}
    </MenuContainer>
  );
};

export default TopMenu;
