import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate as useHistory } from "react-router-dom";

//same as Signup except passwordConfirmation
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  // const passwordConfirmRef = useRef();
  const { login } = useAuth();
  //validation state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    //validation check
    // if (passwordRef.current.value !== passwordConfirmRef.current.value) {
    //   return setError('Passwords do not match')
    // }
    try {
      setError(""); //set the error back to blank
      setLoading(true); //when we sign up the user, we disable the sign up button so we don't create multiple user account when they clicking button multiple time
      //this happens when the password match await/async
      await login(emailRef.current.value, passwordRef.current.value);
      history("/"); //replaced history.push("/")
    } catch (error) {
      setError("Failed to sign in");
      console.log(error);
    }
    //this happens after the try statement
    setLoading(false);
  }
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              {<Form.Control type="email" ref={emailRef} required />}
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button distable={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </>
  );
}
