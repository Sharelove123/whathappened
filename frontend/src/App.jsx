import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Activation from './pages/Activation';
import ChatPage from './pages/ChatPage';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';
import { ChatProvider } from './context/ChatContext';

function App() {
  return (
    <AuthProvider>
      <ChatProvider>
        <Router>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/activation/:token" element={<Activation />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/dashboard" element={<div className="text-xl font-bold p-10">Welcome to your Dashboard (Protected)</div>} />
                </Route>
              </Routes>
            </main>
          </div>
        </Router>
      </ChatProvider>
    </AuthProvider>
  );
}

export default App;
