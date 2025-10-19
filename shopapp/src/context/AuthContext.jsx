// // src/context/AuthContext.jsx
// import { createContext, useState, useContext } from "react";
//
// const AuthContext = createContext(null);
//
// export const AuthProvider = ({ children }) => {
//   const [sessionId, setSessionId] = useState(null);
//   const [user, setUser] = useState(null);
//
//   const login = (session, userData) => {
//     setSessionId(session);
//     localStorage.setItem("sessionId", session);
//     setUser(userData);
//   };
//
//   const logout = () => {
//     setSessionId(null);
//     setUser(null);
//     localStorage.removeItem("sessionId");
//   };
//
//   return (
//     <AuthContext.Provider value={{ sessionId, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };
//
// export const useAuth = () => useContext(AuthContext);
// export default AuthProvider;
