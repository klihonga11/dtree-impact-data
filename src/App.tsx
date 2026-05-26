import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import IndividualsServed from "./pages/IndividualsServed";
import HealthVisitsSupported from "./pages/HealthVisitsSupported";
import Access from "./pages/Access";
import HealthWorkersSupported from "./pages/HealthWorkersSupported";
import Continuity from "./pages/Continuty";
import IndividualAgency from "./pages/IndividualAgency";
import ImprovedCoordination from "./pages/ImprovedCoordination";
import GovernmentSupported from "./pages/GovernmentSupported";
import Efficiency from "./pages/Efficiency";
import Effectiveness from "./pages/Effectiveness";

function App() {
  return (
    <MantineProvider>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          >
            <Route path="individuals-served" element={<IndividualsServed />} />
            <Route path="improved-coordination" element={<ImprovedCoordination />} />
            <Route path="government-supported" element={<GovernmentSupported />} />
            <Route
              path="health-visits-supported"
              element={<HealthVisitsSupported />}
            />
            <Route
              path="health-workers-supported"
              element={<HealthWorkersSupported />}
            />
            <Route path="access" element={<Access />} />
            <Route path="continuity" element={<Continuity />} />
            <Route path="efficiency" element={<Efficiency />} />
            <Route path="individual-agency" element={<IndividualAgency />} />
            <Route path="effectiveness" element={<Effectiveness />} />
          </Route>
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
