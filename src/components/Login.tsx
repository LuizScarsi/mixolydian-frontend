import { useState } from "react";
import { api } from "../services/api";

export default function Login({ onLogin }: { onLogin: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });

      // Exemplo: guarde o token
      localStorage.setItem("token", res.data.token);

      onLogin(); // <-- chama o App para liberar acesso
    } catch (err) {
      setError("Credenciais inválidas.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
      <div className="card p-4 shadow" style={{ maxWidth: 350, width: "100%" }}>
        <h2 className="mb-3">Login</h2>

        {error && <p className="text-danger">{error}</p>}

        <form onSubmit={handleLogin}>
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

          <button className="btn btn-primary w-100" type="submit">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}
