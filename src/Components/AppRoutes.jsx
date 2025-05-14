import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './pages/LoginForm';
import PostList from './pages/PostList';
import SignupForm from './pages/SignupForm';
import UserProfile from './pages/UserProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import PostDetail from './pages/PostDetail';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<PostList />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/posts/:id" element={<PostDetail />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
