import React, { createContext, useContext, useState, useEffect } from 'react'

// 1. Create a Context for Authentication
const AuthContext = createContext()

// 2. Export a custom hook to easily access the auth state in components
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

// 3. Create the Provider component that wraps the entire app
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // 4. Initialization: On mount, check if there's a user saved in localStorage
        // This allows the user to stay logged in even after refreshing the page
        const savedUser = localStorage.getItem('user')
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
        // Set loading to false once the check is done
        setLoading(false)
    }, [])

    // 5. Login Function: Updates state and persists the user to localStorage
    const login = (userData) => {
        setUser(userData)
        localStorage.setItem('user', JSON.stringify(userData))
    }

    // 6. Logout Function: Clears state and removes the user from localStorage
    const logout = () => {
        setUser(null)
        localStorage.removeItem('user')
    }

    // 7. Provide the state and functions to the rest of the app
    const value = {
        user,
        loading,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {/* 8. Only render children once we've finished checking for the saved user */}
            {!loading && children}
        </AuthContext.Provider>
    )
}
