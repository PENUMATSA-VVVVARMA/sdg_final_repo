import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Import pages
import Home from './pages/Home';
import About from './pages/About';
import ItemsList from './pages/ItemsList';
import Admin from './pages/Admin';
import Donations from './pages/Donations';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/items" element={<ItemsList />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;