import { createContext, useContext, useState } from "react";

interface AuthContextData {
  token: string | null;
  role: "admin" | "user" | null;
  name: string | null;
  login: (token: string, role: "admin" | "user", name: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState<"admin" | "user" | null>(
    localStorage.getItem("role") as "admin" | "user" | null
  );
  const [name, setName] = useState(localStorage.getItem("name"));

  const login = (token: string, role: "admin" | "user", name: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    localStorage.setItem("name", name);

    setToken(token);
    setRole(role);
    setName(name);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
    setRole(null);
    setName(null);
  };

  return (
    <AuthContext.Provider value={{ token, role, name, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
