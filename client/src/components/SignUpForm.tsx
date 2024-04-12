import { useMutation } from "@apollo/client";
import React, { FC, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ADD_USER } from "../Graphql/Mutation";
import toast from "react-hot-toast";
import { supabase } from "../supabase/superbaseClient";

type FormData = {
  email: string;
  password: string;
  confirmPassword: string;
};

interface LoginOutProps {
  handleCloseGetStartedModal: () => void; // Define the prop
}

type ValidatedData = Omit<FormData, "confirmPassword">;

const SignUpForm: FC<LoginOutProps> = ({ handleCloseGetStartedModal }) => {
  const [validated, setValidated] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  let userData: ValidatedData = {
    email: "",
    password: "",
  };

  // delete mutation
  const [
    addNewUser,
    { data: sucessData, loading: logingLodaing, error: LoginError },
  ] = useMutation(ADD_USER);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const form = event.currentTarget;
      if (
        !form.checkValidity() ||
        formData.password !== formData.confirmPassword
      ) {
        setValidated(true);
        return;
      }

      if (userData) {
        userData = {
          email: formData.email,
          password: formData.password,
        };

        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            emailRedirectTo: "http://localhost:5173/",
          },
        });

        if (data) {
          await addNewUser({
            variables: { user: userData },
          });

          if (error) {
            toast.error(error.message);

            throw new Error("Error Signin up");
          }

          if (sucessData) {
            toast.success(
              "A verification email has been sent to you click to verify"
            );
          }
        }
      }

      if (LoginError) {
        toast.error(LoginError.message);
        throw new Error("Error Signin up");
      }

      toast.success("Registered Sucessfully");

      handleCloseGetStartedModal();
    } catch (error) {
      toast.error("Error Sigining up");
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

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            minLength={8}
            isInvalid={
              validated && formData.password !== formData.confirmPassword
            }
          />
          <Form.Control.Feedback type="invalid">
            Passwords must match.
          </Form.Control.Feedback>
        </Form.Group>

        <Button disabled={logingLodaing} variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </section>
  );
};

export default SignUpForm;
