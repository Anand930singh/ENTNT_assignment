"use client"

import { useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import "../styles/authentication.css"

function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("admin")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate authentication
    setTimeout(() => {
      console.log("Signing in as:", userType, email, password)

      // Example of showing different toasts based on user type
      if (email && password) {
        toast.success(`Successfully signed in as ${userType}`)
      } else {
        toast.error("Please fill in all required fields")
      }

      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="sign-in-container">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick />

      <div className="sign-in-card">
        <div className="sign-in-header">
          <h1>Sign in</h1>
          <p>Welcome user, please sign in to continue</p>
        </div>

        <div className="user-type-tabs">
          <button className={`tab-button ${userType === "admin" ? "active" : ""}`} onClick={() => setUserType("admin")}>
            Admin
          </button>
          <button
            className={`tab-button ${userType === "inspector" ? "active" : ""}`}
            onClick={() => setUserType("inspector")}
          >
            Inspector
          </button>
          <button
            className={`tab-button ${userType === "engineer" ? "active" : ""}`}
            onClick={() => setUserType("engineer")}
          >
            Engineer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password *"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="sign-in-button" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In With Email And Password"}
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInForm
