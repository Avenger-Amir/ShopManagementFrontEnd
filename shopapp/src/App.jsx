// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Shop from "./pages/Shop";
// import { AuthProvider } from "./context/AuthContext";
// import { createContext, useState } from "react";
import Cart from "./pages/Cart.jsx";
import ShopItemUpdate from "./pages/ShopItemUpdate.jsx";
import UploadItem from "./pages/UploadItem.jsx";
import ShopkeeperLogin from "./pages/ShopkeeperLogin.jsx";
import ShopkeeperSignup from "./pages/ShopkeeperSignup.jsx";
import LoginSelection from "./pages/LoginSelection.jsx";

// export const AuthenticationInfo = createContext();
function App() {
  // const [userName, setUserName] = useState("");
  // const [sessionId, setSessionId] = useState();
  // const [expiryTime, setExpiryTime] = useState();

  return (
    // <AuthenticationInfo.Provider
    //   value={{ userName, sessionId, expiryTime, setUserName, setSessionId, setExpiryTime }}
    // >
      <BrowserRouter>
        <Routes>
            <Route path="/" element={<Shop />} />
            <Route path="/login" element={<LoginSelection />} />
            <Route path="/consumer/login" element={<Login />} />
            <Route path="/merchant/login" element={<ShopkeeperLogin />} />
            <Route path="/merchant/signup" element={<ShopkeeperSignup />} />
            <Route path="/consumer/signup" element={<Signup />} />


            {/*<Route path="/signup" element={<Signup />} />*/}
          {/*<Route path="/shop" element={<Shop />} />*/}
          <Route path="/cart" element={<Cart />} />
          <Route path="/itemupdate" element={<ShopItemUpdate />} />
            <Route path="/uploadItem" element={<UploadItem />} />
        </Routes>
      </BrowserRouter>
    // {/*</AuthenticationInfo.Provider>*/}
  );
}

export default App;
