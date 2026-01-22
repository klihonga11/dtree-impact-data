import "./App.css";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login";
import HomePage from "./pages/Home";
import "@mantine/core/styles.css";
import { MantineProvider } from "@mantine/core";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";

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
          />
        </Routes>
      </AuthProvider>
    </MantineProvider>
  );
}

export default App;
