import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Login = () => {
    // 1. Local state for form inputs
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // 2. Access the login function from AuthContext
    const { login } = useAuth()

    // 3. Navigation hook to redirect after successful login
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        // 4. Mock Logic: In a real app, this would be an API call to a server
        // For now, we simply check that the fields are not empty
        if (username && password) {
            // 5. Trigger the login function from context
            login({ username })

            // 6. Redirect the user back to the home page
            navigate('/')
        }
    }

    return (
        <div className="login-page">
            <div className="container">
                {/* 7. Form submission handled by handleSubmit */}
                <form className="login-form" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">Login</button>
                </form>
            </div>
        </div>
    )
}

export default Login
