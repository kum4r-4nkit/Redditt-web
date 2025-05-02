import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import LoginForm from './LoginForm';
import PostList from './pages/PostList';
import SignupForm from './SignupForm';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginForm />} />
      <Route path="/signup" element={<SignupForm />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<PostList />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
