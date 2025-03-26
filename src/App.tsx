import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import Home from "./pages/home";
import ProtectedRoute from "./components/protected-route";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
