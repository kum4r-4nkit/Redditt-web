import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './Components/AppRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'

function App() {
  return (
    <>
      <Router>
        <AppRoutes />
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
