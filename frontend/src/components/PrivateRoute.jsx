import { Navigate } from 'react-router-dom';
import { useCookies } from './auth/useCookies';

const PrivateRoute = ({ children }) => {
  const { getCookies } = useCookies();

  // Check if the token exists in cookies or implement your own auth check logic
    const cookies = getCookies();
    const isAuthenticated = cookies ? cookies.token: null;

  if (!isAuthenticated) {
    // Redirect to auth if not authenticated
    return <Navigate to="/auth" />;
  }

  // If authenticated, render the children
  return children;
};

export default PrivateRoute;
