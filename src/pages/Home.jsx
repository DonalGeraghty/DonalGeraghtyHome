import React from 'react'
import { Link } from 'react-router-dom'
import NumberList from '../components/NumberList'
import { useAuth } from '../context/AuthContext'

function Home() {
  // 1. Access user globally stored state and logout function
  const { user, logout } = useAuth()

  return (
    <div className="home-page">
      <div className="container">
        {/* 2. Top Navigation Bar: Displays differently based on auth state */}
        <nav className="home-nav">
          {user ? (
            // 3. User is logged in: Show the username and a logout button
            <div className="user-status">
              <span>Logged in as <strong>{user.username}</strong></span>
              <button onClick={logout} className="logout-button">Logout</button>
            </div>
          ) : (
            // 4. User is logged out: Show a link to the login page
            <Link to="/login" className="login-link">Login</Link>
          )}
        </nav>

        <section>
          <h1>Welcome to Donal Geraghty's Home</h1>

          {/* 5. Conditional Content: Restrict the NumberList to logged-in users only */}
          {user ? (
            <div className="members-only">
              <h3>Members Only Content:</h3>
              <NumberList />
            </div>
          ) : (
            // 6. Access Denied State: Encourage the user to log in
            <p className="login-prompt">Please <Link to="/login">login</Link> to see the numbers!</p>
          )}
        </section>
      </div>
    </div>
  )
}

export default Home