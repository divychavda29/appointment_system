import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

const RequireAuth = ({ children }) => {
    const userId = localStorage.getItem("user_id")
    const location = useLocation()

    if (!userId) {
        alert("Please log in to access this page 🔐")
        return <Navigate to="/login" state={{ from: location }} replace />
    }

    return children
}

export default RequireAuth
