import { useLocation, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RequireAuth = () => {
const token = "ew87984 98798";
const location = useLocation();
return token ? : <Navigate to="/login" state={{ from: location }} replace />;
};
export default RequireAuth;


