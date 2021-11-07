import { Routes, BrowserRouter, Route } from "react-router-dom";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Mainscreen from "./pages/dashboard/Mainscreen";

const AuthRoutes = () => {
  return (
    <>
      <Routes>
        <Route exact path="/login" element={Login} />
        <Route exact path="/signup" element={Signup} />
      </Routes>
    </>
  );
};
function App() {
  const login = true;
  return (
    <BrowserRouter>{login ? <Mainscreen /> : <AuthRoutes />}</BrowserRouter>
  );
}

export default App;
