import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaSignInAlt,
  FaGoogle,
  FaFacebookF,
  FaArrowLeft,
  FaEye,
} from "react-icons/fa";
import { useLogin } from "./authHooks/useLogin";

function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { isLogin, login } = useLogin();
  const navigate = useNavigate();

  function handleLoginSubmit(e) {
    e.preventDefault();
    login({
      email: e.target.email.value,
      password: e.target.password.value,
    });
  }

  return (
    <div className="row">
      {/* Right Side - Form Section (login only) */}
      <div className="col-lg-6">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-5">
            <h3 className="text-center mb-4">Login to Your Account</h3>

            <form onSubmit={handleLoginSubmit}>
              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">
                  Email Address <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaEnvelope />
                    </span>
                  </div>
                  <input
                    name="email"
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    autoComplete="email"
                    autoFocus
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text">
                      <FaLock />
                    </span>
                  </div>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    id="password"
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    required
                    minLength={6}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-outline-secondary"
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-pressed={showPassword}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      <i
                        className={`fa ${
                          showPassword ? "fa-eye-slash" : "fa-eye"
                        }`}
                      ></i>
                    </button>
                  </div>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="d-flex justify-content-between align-items-center mb-4">
                <div className="custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    className="custom-control-input"
                    id="rememberMe"
                  />
                  <label className="custom-control-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <Link to="#" className="text-primary small">
                  Forgot Password?
                </Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-block py-3">
                <FaSignInAlt className="mr-2" />
                Login
              </button>
            </form>
          </div>
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-4">
          <Link to="/" className="text-muted">
            <FaArrowLeft className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
