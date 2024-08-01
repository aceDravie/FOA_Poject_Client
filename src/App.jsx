import { useContext } from "react";
import Login from "./pages/Login";
import WelcomePage from "./pages/WelcomePage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./contexts/AuthContext";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import RootLayout from "./layouts/RootLayout";
import AllFood from "./components/AllFood";
import Orders from "./components/Orders";

function App() {
  const currentUser = useContext(AuthContext);
  const RequireAuth = ({ children }) => {
    return currentUser ? children : <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route path="" element={<WelcomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route
            path="dashboard"
            element={
              <RequireAuth>
                <RootLayout />
              </RequireAuth>
            }
          >
          <Route path="" element={<Dashboard/>} />
          <Route path="allFood" element={<AllFood/>}/>
         <Route path="orders" element={<Orders/>}/>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
