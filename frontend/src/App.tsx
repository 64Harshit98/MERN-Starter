import { useState } from "react";
import { Routes, Route, Link, Navigate, Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import { HomePage, LoginPage } from "./pages";

function App() {
  let navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  const handleLogin = () => {
    navigate("/landing", { replace: true });
    setUser({ id: "1", name: "robin" });
  };
  const handleLogout = () => setUser(null);

  return (
    <>
      <h1>React Router</h1>

      <Navigation />

      {user ? <button onClick={handleLogout}>Sign Out</button> : <Link to="/login">Login</Link>}
      <Routes>
        <Route index element={<Landing />} />
        <Route path="landing" element={<Landing />} />
        <Route element={<ProtectedRoute user={user} />}>
          <Route path="home" element={<HomePage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="login" element={<LoginPage handleLogin={handleLogin} />} />

        <Route path="*" element={<p>There's nothing here: 404!</p>} />
      </Routes>
    </>
  );
}

const Navigation = () => (
  <nav>
    <Link to="/landing">Landing</Link>
    <Link to="/home">Home</Link>
    <Link to="/dashboard">Dashboard</Link>
  </nav>
);

const ProtectedRoute: React.FC<any> = ({ user, redirectPath = "/landing", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};

const Landing = () => {
  return <h2>Landing (Public: anyone can access this page)</h2>;
};

const Dashboard = () => {
  return <h2>Dashboard (Protected: authenticated user required)</h2>;
};

export default App;
