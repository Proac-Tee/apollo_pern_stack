import { FC } from "react";

// Define the type for the props
interface HeaderProps {
  handleShowLoginModal: () => void; // Function to handle showing the login modal
  handleShowGetStartedModal: () => void; // Function to handle showing the get started modal
}

// Define the Header component with the specified props type
const Header: FC<HeaderProps> = ({
  handleShowLoginModal,
  handleShowGetStartedModal,
}) => {
  return (
    <header>
      <h2>Dashboard</h2>
      <nav>
        <ul>
          <li onClick={handleShowLoginModal}>Login</li>
          <li onClick={handleShowGetStartedModal}>Get Started</li>
          <li>Log out</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
