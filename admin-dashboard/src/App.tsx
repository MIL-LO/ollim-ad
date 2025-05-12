import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // 로컬 스토리지에서 인증 상태 확인
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // 로그인 처리 함수
  const handleLogin = (token: string) => {
    localStorage.setItem('auth_token', token);
    setIsAuthenticated(true);
  };

  return (
      <Router>
        <Routes>
          <Route
              path="/login"
              element={
                !isAuthenticated ?
                    <Login onLogin={handleLogin} /> :
                    <Navigate to="/dashboard" replace />
              }
          />
          <Route
              path="/dashboard"
              element={
                isAuthenticated ?
                    <div className="p-4">대시보드 준비 중</div> :
                    <Navigate to="/login" replace />
              }
          />
          <Route path="/" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
  );
}

export default App;
