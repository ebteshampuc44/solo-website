import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import AdminDashboard from './AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Routes>
      {/* পাবলিক রাউটস */}
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
      
      {/* প্রাইভেট/এডমিন রাউটস */}
      <Route path="/admin" element={<AdminDashboard />} />
      <Route path="/AdminDashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;