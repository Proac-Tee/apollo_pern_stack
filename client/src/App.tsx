import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import Header from "./components/Header";
import Dashbord from "./components/Dashbord";
import SignUpForm from "./components/SignUpForm";
import LoginForm from "./components/LoginForm";
import { Toaster } from "react-hot-toast";

const App: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showGetStartedModal, setShowGetStartedModal] =
    useState<boolean>(false);

  const handleCloseLoginModal = () => setShowLoginModal(false);
  const handleCloseGetStartedModal = () => setShowGetStartedModal(false);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
    setShowGetStartedModal(false);
  };

  const handleShowGetStartedModal = () => {
    setShowGetStartedModal(true);
    setShowLoginModal(false);
  };

  return (
    <>
      <Toaster position="top-center" />

      <section className="home">
        <Header
          handleShowLoginModal={handleShowLoginModal}
          handleShowGetStartedModal={handleShowGetStartedModal}
        />
        <Dashbord />

        <Modal centered show={showLoginModal} onHide={handleCloseLoginModal}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <LoginForm handleCloseLoginModal={handleCloseLoginModal} />
        </Modal>

        <Modal
          centered
          show={showGetStartedModal}
          onHide={handleCloseGetStartedModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Get Started</Modal.Title>
          </Modal.Header>
          <SignUpForm handleCloseGetStartedModal={handleCloseGetStartedModal} />
        </Modal>
      </section>
    </>
  );
};

export default App;
