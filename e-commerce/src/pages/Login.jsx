import LoginForm from "../features/auth/LoginForm";

function Login() {
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col-lg-8 mx-auto">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
