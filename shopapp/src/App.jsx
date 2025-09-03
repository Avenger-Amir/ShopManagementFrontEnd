// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
// import { AuthProvider } from "./context/AuthContext";
import { createContext, useState } from "react";
import Cart from "./pages/Cart.jsx";

export const AuthenticationInfo = createContext();
function App() {
  const [userName, setUserName] = useState("");
  const [sessionId, setSessionId] = useState();
  const [expiryTime, setExpiryTime] = useState();
  return (
    <AuthenticationInfo.Provider
      value={{ userName, sessionId, expiryTime, setUserName, setSessionId, setExpiryTime }}
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </AuthenticationInfo.Provider>
  );
}

export default App;
