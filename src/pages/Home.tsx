import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      <div>
        <h1>Welcome!</h1>
        <Button onClick={handleLogout}>Log out</Button>
      </div>
    </>
  );
}
