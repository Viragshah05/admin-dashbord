import { createContext, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const NavigateWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  const login = (email, password) => {
    if (email === "admin@admin.com" && password === "admin") {
      setUser({ email, role: "admin" });
      navigate("/admin-dashboard");
    } else {
      alert("You have entered an invalid email and password");
    }
  };

  const logout = () => {
    setUser(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
