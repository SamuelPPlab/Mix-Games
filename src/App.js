import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import GameRegisterPage from './pages/GameRegisterPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/register-game" element={<GameRegisterPage />} />
    </Routes>
  );
};

export default App;
