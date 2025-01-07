// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Subscribe from './pages/Subscribe';
import Admin from './pages/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Subscribe />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;