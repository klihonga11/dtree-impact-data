import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";
import classes from "../css/NavbarSimple.module.css";
import { Container, Image, Text } from "@mantine/core";
import logo from "../assets/D-tree logo.png"
import ConfirmationDialog from "../components/ConfirmationDialog";
import { useDisclosure } from "@mantine/hooks";

const data = [
  { link: "/home/individuals-served", label: "1. Individuals Served" },
  { link: "/home/improved-coordination", label: "2. Improved coordination" },
  { link: "/home/government-supported", label: "3. Government supported" },
  {
    link: "/home/health-visits-supported",
    label: "4. Health visits supported",
  },
  {
    link: "/home/health-workers-supported",
    label: "5. Health workers supported",
  },
  { link: "/home/access", label: "6. Access" },
  { link: "/home/continuity", label: "7. Continuity" },
  { link: "/home/efficiency", label: "8. Efficiency" },
  { link: "/home/individual-agency", label: "9. Individual Agency" },
  { link: "/home/effectiveness", label: "10. Effectiveness" },
];

export default function HomePage() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const [opened, { open, close }] = useDisclosure(false);

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
      <div style={{ display: "flex", height: "100vh" }}>
        <nav className={classes.navbar}>
            <Image src={logo} height={150} w="auto" fit="contain"/>
            <div className={classes.navbarMain}>{links}</div>

            <div className={classes.footer}>
              <a href="#" className={classes.link} onClick={open}>
                <span>Logout</span>
              </a>
            </div>
          </nav>

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <header className={classes.header}>
              <Container style={{margin: 8}} className={classes.inner}>
                <Text size="xl" fw={700}>D-tree Impact Management Data</Text>
              </Container>
            </header>

             <div style={{ flex: 1, padding: "2rem" }}>
              <Outlet />
            </div>
          </div>
      </div>
      
      <ConfirmationDialog title="Log out" text="Are you sure you want to log out?" opened={opened} close={close} onClickYes={logout} />
    </>
  );
}
