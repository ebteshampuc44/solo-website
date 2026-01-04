import { Routes, Route } from 'react-router-dom';
import Root from './Root';
import Home from './pages/Home';
import AdminDashboard from './AdminDashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Root />}>
        <Route index element={<Home />} />
        {/* AdminDashboard কে নেস্টেড রাউট হিসেবে অ্যাড করুন */}
        <Route path="AdminDashboard" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
}

export default App;