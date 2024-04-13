import React, { FC } from "react";
import { supabase } from "../supabase/superbaseClient";
import toast from "react-hot-toast";
import { useAuth } from "../supabase/AuthProvider";
import { Dropdown } from "react-bootstrap";
import { GiHamburgerMenu } from "react-icons/gi";

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
  const { user } = useAuth();

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        toast.error(error.message);
        throw new Error("An error ocurred");
      }

      toast.success("Logged out succesfully");
    } catch (error) {
      toast.error("Error logging out");
    }
  }

  return (
    <header>
      <h2>Dashboard</h2>
      <div className="desktop_dropdown">
        <nav>
          <ul>
            {!user && (
              <>
                <li onClick={handleShowLoginModal}>Login</li>
                <li onClick={handleShowGetStartedModal}>Get Started</li>
              </>
            )}
            {user && (
              <li>
                <button className="logout_button_style" onClick={signOut}>
                  Log out
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      <div className="mobile_dropdown">
        <Dropdown>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            <GiHamburgerMenu size={20} />
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {!user && (
              <>
                <Dropdown.Item onClick={handleShowLoginModal}>
                  Login
                </Dropdown.Item>
                <Dropdown.Item onClick={handleShowGetStartedModal}>
                  Get started
                </Dropdown.Item>
              </>
            )}
            {user && (
              <>
                <Dropdown.Item onClick={signOut}>Logout</Dropdown.Item>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </header>
  );
};

export default Header;

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
// Custom toggle component
const CustomToggle = React.forwardRef<
  HTMLAnchorElement,
  { onClick: (event: React.MouseEvent<HTMLAnchorElement>) => void }
>(({ onClick }, ref) => (
  <a
    href="#"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    <GiHamburgerMenu />
  </a>
));
