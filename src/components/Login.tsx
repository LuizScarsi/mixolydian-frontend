import { use, useState } from "react";
import { api } from "../services/api";
import { useAuth } from "../contexts/AuthContext.tsx";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");

  const {login} = useAuth();

  const generateId = () => Date.now();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (mode === "login") {
        const res = await api.post("/auth/login", { email, password });
        login(res.data.token, res.data.role, res.data.name);
        onLogin();
      } else {
        await api.post("/user", {
          id: generateId(), // 👈 obrigatório pro backend
          name,
          email,
          password,
          role,
        });

        setMode("login");
        setError("Conta criada com sucesso! Faça login.");
      }
    } catch (err) {
      setError("Erro ao processar a requisição.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 350, width: "100%" }}>
        <h2 className="mb-3">
          {mode === "login" ? "Login" : "Criar conta"}
        </h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleSubmit}>
          {mode === "register" && (
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === "register" && (
            <div className="mb-3">
              <input
                type="role"
                className="form-control"
                placeholder="Função"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              />
            </div>
          )}

          <button className="btn btn-primary w-100" type="submit">
            {mode === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <button
          className="btn btn-link mt-2"
          onClick={() =>
            setMode(mode === "login" ? "register" : "login")
          }
        >
          {mode === "login"
            ? "Criar uma conta"
            : "Já tenho conta"}
        </button>
      </div>
    </div>
  );
}
