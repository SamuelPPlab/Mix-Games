import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MainPage from './pages/MainPage';
import GameRegisterPage from './pages/GameRegisterPage';
import Cart from './pages/Cart';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/register-game" element={<GameRegisterPage />} />
      <Route path="/checkout" element={ <Cart /> } />
    </Routes>
  );
};

export default App;
