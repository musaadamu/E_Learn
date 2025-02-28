import React, { createContext, useState } from "react";

// Create AuthContext with a default value
export const AuthContext = createContext({
  user: null,
  authenticated: false,
  handleLogin: () => {},
  handleLogout: () => {},
});

// AuthProvider component to wrap your application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);

  // Example: handleLogin stores a token and decodes user info (replace with real logic)
  const handleLogin = (token) => {
    // In a real app, decode the token or fetch user details.
    localStorage.setItem("token", token);
    // For demonstration, we'll simulate a user object:
    const simulatedUser = { id: "123", name: "John Doe", role: "student" };
    setUser(simulatedUser);
    setAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, authenticated, handleLogin, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
