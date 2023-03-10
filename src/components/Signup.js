import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext.js";
import { Link, useNavigate as useHistory} from "react-router-dom"; //V6 react has useNavigate instead of useHistory
import "./Card.css"

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth()
  const firstNameRef = useRef();
  const lastNameRef = useRef();
  //validation state
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  // const { currentUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault()

    //validation check
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError('Passwords do not match')
    }
    try {
      setError('') //set the error back to blank
      setLoading(true) //when we sign up the user, we disable the sign up button so we don't create multiple user account when they clicking button multiple time
      //this happens when the password match await/async
      await signup(firstNameRef.current.value, lastNameRef.current.value,emailRef.current.value, passwordRef.current.value)
      history("/login") //replaced history.push("/")
      
    } catch(error) {
      setError('Failed to create an account')
      console.log(error)
    }
    //this happens after the try statement
    setLoading(false)
 
  }
  return (
    <div className="cardContainer">
      <Card className="cardBody">
        <Card.Body >
          <h2 className="text-center mb-4">Sign Up</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
          <Form.Group id="firstName">
              <Form.Label>First Name</Form.Label>
              {<Form.Control type="name" ref={firstNameRef} required />}
            </Form.Group>
            <Form.Group id="lastName">
              <Form.Label>Last Name</Form.Label>
              {<Form.Control type="name" ref={lastNameRef} required />}
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              {<Form.Control type="email" ref={emailRef} required />}
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button distable={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
      Already have an account? <Link to="/login">Log In</Link>
      </div>
    </div>
  );
}
