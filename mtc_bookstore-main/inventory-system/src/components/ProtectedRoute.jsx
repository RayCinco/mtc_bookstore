import { useNavigate } from "react-router";
import { useUser } from "../features/auth/authHooks/useUser";
import { Spinner } from "reactstrap";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useUser();

  // 3. If there is no Authenticated user, redirect to the /login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [isAuthenticated, isLoading, navigate]);

  // 2. While loading, show a spinner
  if (isLoading) return <Spinner />;

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;

  // 5. Otherwise, render nothing
  return null;
}

export default ProtectedRoute;
