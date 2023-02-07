import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

//same as Signup except passwordConfirmation
export default function ForgotPassword() {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  //validation state
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("")

  async function handleSubmit(e) {
    e.preventDefault();

    //validation check
    try {
      setError(""); //set the error back to blank
      setLoading(true); //when we sign up the user, we disable the sign up button so we don't create multiple user account when they clicking button multiple time
      //this happens when the password match await/async
      await resetPassword(emailRef.current.value);
      setMessage('Check your inbox for further instructions')
      // history("/"); //replaced history.push("/") -> comment out as we dont want to go back to the dashboard
    } catch (error) {
      setError("Failed to reset password");
      console.log(error);
    }
    //this happens after the try statement
    setLoading(false);
  }
  return (
    <div className="cardContainer">
      <Card className="cardBody">
        <Card.Body >
          <h2 className="text-center mb-4">Change Password</h2>

          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              {<Form.Control type="email" ref={emailRef} required />}
            </Form.Group>
            <Button distable={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Log In</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/signup">Sign Up</Link>
      </div>
    </div>
  );
}
