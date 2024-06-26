import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { supabase } from "../supabase/superbaseClient";
import toast from "react-hot-toast";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface LoginFormProps {
  handleCloseLoginModal: () => void; // Define the prop
}

type ValidatedData = Omit<FormData, "confirmPassword">;

const LoginForm: FC<LoginFormProps> = ({ handleCloseLoginModal }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  let dataToLogin: ValidatedData = {
    email: "",
    password: "",
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const form = event.currentTarget;
      if (!form.checkValidity()) {
        setValidated(true);
        return;
      }

      dataToLogin = {
        email: formData.email,
        password: formData.password,
      };

      const { error } = await supabase.auth.signInWithPassword({
        email: dataToLogin.email,
        password: dataToLogin.password,
      });

      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }

      handleCloseLoginModal();
    } catch (error) {
      toast.error("An error occured");
    }
  };

  return (
    <section className="form_style">
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          <Form.Control.Feedback type="invalid">
            Password must be at least 8 characters.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default LoginForm;
