import _ from 'lodash';
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {

    const userData = window.localStorage.getItem("accessToken");
    // If the user is not authenticated, redirect to the login page
    if (_.isEmpty(userData)) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />; // Render the child routes if authenticated
};

export default ProtectedRoute;