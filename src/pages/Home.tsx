import { useNavigate } from "react-router-dom";
import { Button } from "@mantine/core";
import { useAuth } from "../hooks/useAuth";

export default function HomePage() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
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
