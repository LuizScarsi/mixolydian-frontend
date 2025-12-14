import { useState } from "react";
import { api } from "./services/api";
import { useAuth } from "./contexts/AuthContext.tsx";


import Dashboard from "./components/Dashboard";
import OptionsMenu from "./components/OptionsMenu";
import Loading from "./components/Loading";
import CrudContainer from "./components/CrudContainer";
import Login from "./components/Login";

export default function App() {
  const [isAuth, setIsAuth] = useState(() => {
    return !!localStorage.getItem("token"); // logado se tiver token
  });

  const [page, setPage] = useState<"home" | "dashboard">("home");
  const [data, setData] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [route, setRoute] = useState("");

  const getAll = async (r: string) => {
    setLoading(true);
    setRoute(r);

    try {
      const response = await api.get(`/${r}/all`);
      const raw = response.data;

      let result = raw;

      if (r === "playlist") {
        // const playlists = raw.playlists ?? [];
        // result = playlists.map((p: any) => ({
        //   id: p.id,
        //   name: p.name,
        //   description: p.description,
        // }));
        result = raw.playlists ?? raw;
      } 
      else if (r === "music") {
        result = raw.musics;
      }
      else {
        result =
          raw.users ||
          raw.musics ||
          raw.playlists;
      }

      setData(result);
    } catch (error) {
      console.error("Erro na requisição:", error);
    } finally {
      setLoading(false);
    }
  };


  const logout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setData(null);
    setRoute("");
  };

  // 🚀 SE NÃO ESTÁ LOGADO → MOSTRA TELA DE LOGIN
  if (!isAuth) {
    return <Login onLogin={() => setIsAuth(true)} />;
  }

  const { role, name } = useAuth();
  return (
    <div className="d-flex justify-content-center align-items-center w-100 min-vh-100">
      <div className="content-wrapper text-center">
        <p>
          Logado como: <strong>{name}</strong> ({role})
        </p>

        {role === "admin" && (
          <button
            className="btn btn-primary mb-3 ms-2"
            onClick={() => setPage("dashboard")}
          >
            📊 Dashboard
          </button>
        )}

        <h1 className="mb-4">Escolha uma opção:</h1>

        <button className="btn btn-danger mb-3" onClick={logout}>
          Logout
        </button>

        {page === "home" && (
          <>
            <OptionsMenu onSelect={getAll} activeRoute={route} />

            {loading && <Loading />}

            {data && (
              <CrudContainer
                key={route}
                route={route}
                data={data}
                getAll={() => getAll(route)}
              />
            )}
          </>
        )}

        {page === "dashboard" && role === "admin" && (
          <>
            <button
              className="btn btn-secondary mb-3"
              onClick={() => setPage("home")}
            >
              ⬅ Voltar
            </button>

            <Dashboard />
          </>
        )}
      </div>
    </div>
  );
}

