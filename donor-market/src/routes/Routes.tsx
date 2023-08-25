import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/authentication/Login3';
import RegisterPage from '../pages/authentication/Register3';
import UserProfile from '../pages/user/UserProfile';
// import NotFoundPage from './pages/NotFoundPage';

const RoutesComponent = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/user/profile" element={<UserProfile />} />
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  </Router>
);

export default RoutesComponent;
