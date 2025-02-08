import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { handleLogin } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    if (!email || !password) {
      setError("Both are required field");
      return;
    }
    if (email === "admin@admin.com" && password === "Admin") {
      console.log("Login Successful!", formData);
      handleLogin();
      navigate("/dashboard", { replace: true });
      setError("");
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col w-1/2 mx-auto">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="border focus:outline-none rounded-md"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="border focus:outline-none rounded-2xl mb-4"
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginForm;
