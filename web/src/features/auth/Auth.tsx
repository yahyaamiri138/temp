import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../../app/stores";
import MCITLogo from "../../assets/MCITLogo.png";
import "../../CSS/Auth.css";
import { useTranslation } from "react-i18next";
import { login } from "./authSlice";

interface LoginFormState {
  username: string;
  password: string;
}

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { t } = useTranslation();
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
        setLocalError(t("auth.invalidCredentials"));
      }
    } catch {
      setLocalError("Something went wrong. Try again.");
      setLocalError(t("auth.somethingWrong"));
    }
  };

  //Translation and RTL support
  const { i18n } = useTranslation();
  useEffect(() => {
    const isRTL = i18n.language.startsWith("fa");
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language]);

  return (
    <div
      className="auth-container"
      dir={i18n.language.startsWith("fa") ? "rtl" : "ltr"}
    >
      <div className="auth-card">
        {/* LEFT SIDE */}
        <div className="auth-left">
          <img src={MCITLogo} alt="MCIT Logo" className="auth-logo" />
        </div>

        {/* RIGHT SIDE */}
        <div className="auth-right">
          {/* <h3 className="auth-title">Login</h3> */}
          <h3 className="auth-title">{t("auth.login")}</h3>
          <form onSubmit={handleSubmit}>
            {/* Username */}
            <div className="input-group">
              <i className="pi pi-user input-icon" />
              <input
                type="text"
                name="username"
                placeholder={t("auth.username")}
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
                placeholder={t("auth.password")}
                value={form.password}
                onChange={handleChange}
                required
              />
              <i
                className={
                  showPassword
                    ? "pi pi-eye-slash toggle-icon"
                    : "pi pi-eye toggle-icon"
                }
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>

            {(error || localError) && (
              <p className="error-text">{error || localError}</p>
            )}

            <button type="submit" disabled={loading} className="login-btn">
              {loading
                ? t("common.loading") || "Signing in..."
                : t("auth.login")}
            </button>
          </form>

          <p className="signup-text">
            {t("auth.notMember")}{" "}
            <span onClick={() => navigate("/register")}>
              {t("auth.signup")}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
