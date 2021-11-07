import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Mainscreen from "./pages/dashboard/Mainscreen";
import { useNavigate } from "react-router";

const AuthRoutes = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("login");
  }, []);
  return (
    <>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

function App() {
    const token = localStorage.getItem("token");

    return (
        <BrowserRouter>
            {token !== null ? <Mainscreen /> : <AuthRoutes />}
        </BrowserRouter>
    );
}

export default App;
