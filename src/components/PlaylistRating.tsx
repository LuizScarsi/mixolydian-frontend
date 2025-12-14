import { useEffect, useState } from "react";
import { api } from "../services/api";

type Rating = {
  id: number;
  stars: number;
  review: string;
  id_user: number;
};

export default function PlaylistRating({ playlistId }: { playlistId: number }) {
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);

  const token = localStorage.getItem("token");

  const loggedUserId = token
    ? JSON.parse(atob(token.split(".")[1])).id
    : null;

  const loadRatings = async () => {
    const res = await api.get(`/rating/playlist/${playlistId}`);

    const allRatings: Rating[] = res.data.ratings || [];
    setRatings(allRatings);
    setAverage(res.data.average || 0);

    // ⭐ acha o rating do usuário logado
    if (loggedUserId) {
      const myRating = allRatings.find(
        (r) => r.id_user === loggedUserId
      );

      if (myRating) {
        setStars(myRating.stars);
        setReview(myRating.review || "");
      } else {
        setStars(0);
        setReview("");
      }
    }
  };

  useEffect(() => {
    loadRatings();
  }, [playlistId, token]); // 👈 recarrega ao trocar usuário

  const submitRating = async () => {
    await api.post("/rating", {
      stars,
      review,
      id_playlist: playlistId,
    });

    loadRatings();
  };

  return (
    <div className="mt-3">
      <h6>Média: ⭐ {average.toFixed(1)}</h6>

      {token ? (
        <>
          {/* ⭐ estrelas clicáveis */}
          <div className="mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <span
                key={s}
                style={{
                  cursor: "pointer",
                  fontSize: "1.4rem",
                  color: s <= stars ? "#ffc107" : "#ccc",
                }}
                onClick={() => setStars(s)}
              >
                ★
              </span>
            ))}
          </div>

          <textarea
            className="form-control mb-2"
            placeholder="Comentário (opcional)"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button
            className="btn btn-sm btn-primary"
            disabled={stars === 0}
            onClick={submitRating}
          >
            Avaliar
          </button>
        </>
      ) : (
        <p className="text-muted">
          Faça login para avaliar esta playlist.
        </p>
      )}

      <hr />

      {ratings.length === 0 && <p>Nenhuma avaliação ainda.</p>}

      {ratings.map((r) => (
        <div key={r.id} className="mb-1">
          ⭐ {r.stars} — {r.review || "Sem comentário"}
        </div>
      ))}
    </div>
  );
}
