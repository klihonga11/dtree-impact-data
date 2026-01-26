import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useEffect, useState } from "react";
import classes from "../css/NavbarSimple.module.css";

const data = [
  { link: "", label: "1. Individuals Served" },
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
  const [active, setActive] = useState("1. Individuals Served");
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
    <a
      className={classes.link}
      data-active={item.label === active || undefined}
      href={item.link}
      key={item.label}
      onClick={(event) => {
        event.preventDefault();
        setActive(item.label);
      }}
    >
      <span>{item.label}</span>
    </a>
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>{links}</div>

      <div className={classes.footer}>
        <a href="#" className={classes.link} onClick={handleLogout}>
          <span>Logout</span>
        </a>
      </div>
    </nav>
  );
}
