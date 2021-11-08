import { useEffect } from "react";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Mainscreen from "./pages/dashboard/Mainscreen";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import setAuthToken from "./utils/setAuthToken";

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
  const state = useSelector((state) => state);

  if (state.token) setAuthToken(state.token);

  return (
    <BrowserRouter>
      {state.token !== null ? <Mainscreen /> : <AuthRoutes />}
    </BrowserRouter>
  );
}

export default App;
