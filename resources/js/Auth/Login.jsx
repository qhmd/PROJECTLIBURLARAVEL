import React, { useState } from "react";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      console.log(formData)
      const response = await axios.post("/login", formData);
      console.log(response.data); // Tampilkan pesan sukses
      window.location.href = "/dashboard"; // Arahkan ke dashboard
    } catch (error) {
      if (error.response) {
        // Cek apakah ada errors di data
        const errorMessage = error.response.data.errors 
            ? Object.values(error.response.data.errors).flat().join(", ")
            : error.response.data.message;
        console.error(errorMessage);
    } else {
        console.error("Terjadi Kesalahan Jaringan");
    }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {errors.general && <div className="error">{errors.general}</div>}
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
};

export default Login;
