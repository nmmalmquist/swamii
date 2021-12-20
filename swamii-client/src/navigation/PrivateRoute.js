import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import AuthContext from '../auth/context';

export { PrivateRoute };

function PrivateRoute({ Component, ...rest }) {
    const { user } = useContext(AuthContext);
    
     // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return user ? <Outlet /> : <Navigate to="/entry" />;
}