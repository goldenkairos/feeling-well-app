import React, { useState} from 'react'
import { Card,Button,Alert } from "react-bootstrap"
import { useAuth } from '../contexts/AuthContext'
import { Link, useNavigate as useHistory } from "react-router-dom";

export default function Dashboard() {

  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError('') //clearing out the error when user logout

    try {
      await logout()
      history("/login")
    }
    catch{
      setError("Failed to log out")
  } 
  }


  return (
    <>
      <Card>
    <Card.Body>
    <h2 className="text-center mb-4">Profile</h2>
    {error && <Alert variant="danger">{error}</Alert>}
    <strong>Email:</strong> { currentUser.email }
    <Link to="/update-profile" className="btn btn-primary w-100 mt-3">Update Profile</Link>
    </Card.Body>
      </Card>
      <div className="w-100 text-canter mt-2">
       <Button variant="link" onClick ={handleLogout}>Log Out</Button>
      </div>
    </>
  )
}
