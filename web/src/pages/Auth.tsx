import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/stores";
import "./Auth.css";

interface LoginFormState {
  username: string;
  password: string;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState<LoginFormState>({
    username: "",
    password: "",
  });

  const [localError, setLocalError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError("");

    try {
      const result = await dispatch(
        login({
          username: form.username,
          password: form.password,
        }),
      );

      if (login.fulfilled.match(result)) {
        navigate("/dashboard");
      } else {
        setLocalError("Invalid username or password");
      }
    } catch {
      setLocalError("Something went wrong. Try again.");
    }
  };

  // return (
  //   <div
  //     style={{
  //       width: "50vh",
  //       height: "50vh",
  //       margin: "50px auto",
  //       padding: "20px",
  //       border: "1px solid #ccc",
  //       borderRadius: 8,
  //       backgroundColor: "#FFF"
  //     }}
  //   >
  //     <h4 className="text-center pb-3">Sign In</h4>

  //     <form onSubmit={handleSubmit}>
  //       {/* Username */}
  //       <div style={{ marginBottom: 15, position: "relative" }}>
  //         <i
  //           className="pi pi-user"
  //           style={{
  //             position: "absolute",
  //             left: "10px",
  //             top: "50%",
  //             transform: "translateY(-50%)",
  //             color: "#999",
  //             fontSize: "13px",
  //             zIndex: 1,
  //           }}
  //         />
  //         <input
  //           type="text"
  //           name="username"
  //           placeholder="Username"
  //           value={form.username}
  //           onChange={handleChange}
  //           required
  //           style={{
  //             width: "100%",
  //             padding: "8px 8px 8px 35px",
  //             border: "1px solid #ddd",
  //             borderRadius: 4,
  //             fontSize: "14px",
  //             outline: "none",
  //             boxSizing: "border-box",
  //           }}
  //         />
  //       </div>

  //       {/* Password */}
  //       <div style={{ marginBottom: 15, position: "relative" }}>
  //         <i
  //           className="pi pi-lock"
  //           style={{
  //             position: "absolute",
  //             left: "12px",
  //             top: "50%",
  //             transform: "translateY(-50%)",
  //             color: "#999",
  //             fontSize: "13px",
  //             zIndex: 1,
  //           }}
  //         />
  //         <input
  //           type={showPassword ? "text" : "password"}
  //           name="password"
  //           placeholder="Password"
  //           value={form.password}
  //           onChange={handleChange}
  //           required
  //           style={{
  //             width: "100%",
  //             padding: "8px 8px 8px 35px",
  //             border: "1px solid #ddd",
  //             borderRadius: 4,
  //             fontSize: "14px",
  //             outline: "none",
  //             boxSizing: "border-box",
  //           }}
  //         />
  //         <i
  //           className={showPassword ? "pi pi-eye-slash" : "pi pi-eye"}
  //           onClick={() => setShowPassword(!showPassword)}
  //           style={{
  //             position: "absolute",
  //             right: "12px",
  //             top: "50%",
  //             transform: "translateY(-50%)",
  //             color: "#999",
  //             fontSize: "14px",
  //             cursor: "pointer",
  //             zIndex: 1,
  //           }}
  //         />
  //       </div>

  //       {/* Errors */}
  //       {(error || localError) && (
  //         <p style={{ color: "red", marginBottom: 10 }}>
  //           {error || localError}
  //         </p>
  //       )}

  //       {/* Submit */}
  //       <button
  //         type="submit"
  //         disabled={loading}
  //         style={{
  //           width: "100%",
  //           padding: 10,
  //           backgroundColor: "#007bff",
  //           color: "white",
  //           border: "none",
  //           borderRadius: 4,
  //         }}
  //       >
  //         {loading ? "Signing in..." : "Login"}
  //       </button>
  //     </form>

  //     {/* Redirect to Register */}
  //     <p style={{ marginTop: 20, textAlign: "center" }}>
  //       Don't have an account?{" "}
  //       <button
  //         type="button"
  //         onClick={() => navigate("/register")}
  //         style={{
  //           background: "none",
  //           border: "none",
  //           color: "#007bff",
  //           cursor: "pointer",
  //           textDecoration: "underline",
  //         }}
  //       >
  //         Sign Up
  //       </button>
  //     </p>
  //   </div>
  // );
return (
  <div className="auth-container">
    <div className="auth-card">
      {/* LEFT SIDE */}
      <div className="auth-left">
        <div className="auth-left-content">
          <h1>Hello,<br />welcome!</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          <button className="view-btn">View more</button>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="auth-right">
        <h3 className="auth-title">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div className="input-group">
            <i className="pi pi-user input-icon" />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <i className="pi pi-lock input-icon" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <i
              className={showPassword ? "pi pi-eye-slash toggle-icon" : "pi pi-eye toggle-icon"}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>

          {(error || localError) && (
            <p className="error-text">{error || localError}</p>
          )}

          <button type="submit" disabled={loading} className="login-btn">
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="signup-text">
          Not a member yet?{" "}
          <span onClick={() => navigate("/register")}>Sign up</span>
        </p>
      </div>
    </div>
  </div>
);
};

export default Auth;
