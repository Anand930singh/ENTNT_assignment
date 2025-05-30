import { useState } from "react"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import "react-toastify/dist/ReactToastify.css"
import "../styles/authentication.css"
import { useNavigate } from "react-router-dom"
import Users from "../data/users.json"
import { login } from "../slice/authSlice"

function SignInForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [userType, setUserType] = useState("Admin")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const storeLoginData = (userData) => {
    dispatch(
      login({
        id: userData.id,
        email: userData.email,
        role: userData.role,
      }),
    )
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const authenticateUser = (e) => {
    const usersData = Users.users
    for (const value of usersData) {
      if (value.role === userType && value.email === email && value.password === password) {
        storeLoginData(value)
        return true
      }
    }
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const boolAuth = await authenticateUser()
    setTimeout(() => {
      if (email && password && boolAuth) {
        navigate("/home")
        toast.success(`Successfully signed in as ${userType}`)
      } else {
        toast.error("Sorry, looks like that's the wrong email or password.")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="sign-in-container">
      <div className="sign-in-card">
        <div className="sign-in-header">
          <h1>Sign in</h1>
          <p>Welcome user, please sign in to continue</p>
        </div>

        <div className="user-type-tabs">
          <button className={`tab-button ${userType === "Admin" ? "active" : ""}`} onClick={() => setUserType("Admin")}>
            Admin
          </button>
          <button
            className={`tab-button ${userType === "Inspector" ? "active" : ""}`}
            onClick={() => setUserType("Inspector")}
          >
            Inspector
          </button>
          <button
            className={`tab-button ${userType === "Engineer" ? "active" : ""}`}
            onClick={() => setUserType("Engineer")}
          >
            Engineer
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group-auth">
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group-auth">
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