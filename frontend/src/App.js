import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import ResetPasswordForm from './components/ResetPasswordForm';
import RentProperty from './components/RentProperty';
import ListProperty from './components/ListProperty';
import UserProfile from './components/UserProfile';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  // Importing useHistory hook

  const handleLogin = () => {
    setIsLoggedIn(true);

  };

  const handleLogout = () => {
    setIsLoggedIn(false);

  };

  return (
    <Router>
      <div className=' '>
        <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path='/login' element={<LoginForm />} />

          <Route path="/" element={isLoggedIn ? <LandingPage /> : <LoginForm onLogin={handleLogin} />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/rent-property" element={<RentProperty />} />
          <Route path="/list-property" element={isLoggedIn ? <ListProperty /> : <ListProperty onLogin={handleLogin} />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/reset-password/:token" element={<ResetPasswordForm />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;