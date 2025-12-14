import { useEffect, useState } from "react";
import { api } from "../services/api";

type DashboardData = {
  users: number;
  musics: number;
  playlists: number;
  ratings: number;
  averageRating: number;
};

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const res = await api.get("/dashboard");
    setData(res.data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <p>Carregando dashboard...</p>;
  if (!data) return null;

  return (
    <div className="container mt-4">
      <h2 className="mb-4">📊 Dashboard (Admin)</h2>

      <div className="row g-4">

        <Card title="Usuários" value={data.users} />
        <Card title="Músicas" value={data.musics} />
        <Card title="Playlists" value={data.playlists} />
        <Card title="Avaliações" value={data.ratings} />

        <div className="col-md-6">
          <div className="card shadow-sm p-3">
            <h5>Média Geral de Avaliações</h5>
            <p style={{ fontSize: "1.5rem" }}>
              ⭐ {data.averageRating.toFixed(2)}
            </p>
          </div>
        </div>

      </div>

      <button className="btn btn-secondary mt-4" onClick={load}>
        🔄 Atualizar dados
      </button>
    </div>
  );
}

function Card({ title, value }: { title: string; value: number }) {
  return (
    <div className="col-md-3">
      <div className="card shadow-sm p-3 text-center">
        <h6>{title}</h6>
        <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{value}</p>
      </div>
    </div>
  );
}
