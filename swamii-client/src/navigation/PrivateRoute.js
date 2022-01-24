import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../auth/context';

export { PrivateRoute };

function PrivateRoute({ Component, type, ...rest }) {
    const { user, admin } = useContext(AuthContext);
    
     // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    if(type === "user")
    {
        return user ? <Outlet /> : <Navigate to="/entry" />;
    }
    if(type === "admin")
    {
        return admin ? <Outlet /> : <Navigate to="/admin/login" />;
    }
    else{
        return <Outlet/>
    }
}