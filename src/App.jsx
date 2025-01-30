import { BrowserRouter as Route, Router, Routes } from "react-router-dom";
import "./App.css";
import { AuthProvider, NavigateWrapper } from "./context/AuthContext";
import Login from "./components/login/Login";
import AdminDashboard from "./components/admin-dashbord/AdminDashboard";
import Product from "./components/product/product";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <NavigateWrapper>
            <Route path="/" element={<Login />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/product" element={<Product />} />
          </NavigateWrapper>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
