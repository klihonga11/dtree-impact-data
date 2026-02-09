import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import classes from "../css/NavbarSimple.module.css";
import { Container, Text } from "@mantine/core";

const data = [
  { link: "/home/individuals-served", label: "1. Individuals Served" },
  { link: "", label: "2. Improved coordination" },
  { link: "", label: "3. Government supported" },
  { link: "", label: "4. Health visits supported" },
  { link: "", label: "5. Health workers supported" },
  { link: "", label: "6. Access" },
  { link: "", label: "7. Continuity" },
  { link: "", label: "8. Efficiency" },
  { link: "", label: "9. Individual Agency" },
  { link: "", label: "10. Effectiveness" },
];

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = async (event: React.MouseEvent) => {
    event.preventDefault();
    await logout();
  };

  const links = data.map((item) => (
    <NavLink
      to={item.link}
      key={item.label}
      className={({ isActive }) =>
        `${classes.link} ${isActive ? classes.active : ""}`
      }
    >
      <span>{item.label}</span>
    </NavLink>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="md" className={classes.inner}>
          <Text>D-tree Impact Management Data</Text>
        </Container>
      </header>

      <div style={{ display: "flex" }}>
        <nav className={classes.navbar}>
          <div className={classes.navbarMain}>{links}</div>

          <div className={classes.footer}>
            <a href="#" className={classes.link} onClick={handleLogout}>
              <span>Logout</span>
            </a>
          </div>
        </nav>

        <div style={{ flex: 1, padding: "2rem" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}
