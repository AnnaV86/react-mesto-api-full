import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';


const ProtectedRoute = ({ login, children }) => {
  return <>{login ? children : <Navigate to='/sign-up' />}</>;
};

export default ProtectedRoute;
