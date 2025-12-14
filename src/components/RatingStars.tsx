import { useEffect, useState } from "react";
import { api } from "../services/api";

type Rating = {
  id: number;
  stars: number;
  review: string;
};

export default function RatingStars({ playlistId }: { playlistId: number }) {
  const [stars, setStars] = useState<number>(0);
  const [review, setReview] = useState("");
  const [average, setAverage] = useState(0);
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      console.log("Loading ratings for playlist:", playlistId);
      const [playlistRatings, myRating] = await Promise.all([
        api.get(`/rating/playlist/${playlistId}`),
        api.get(`/rating/my/playlist/${playlistId}`),
      ]);

      setRatings(playlistRatings.data.ratings || []);
      setAverage(Number(playlistRatings.data.average || 0));

      if (myRating.data) {
        setStars(myRating.data.stars);
        setReview(myRating.data.review || "");
      }
    } catch {
      // usuário não avaliou ainda
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, [playlistId]);

  const submitRating = async (value: number) => {
    setStars(value);

    await api.post("/rating", {
      stars: value,
      review,
      id_playlist: playlistId,
    });

    loadAll();
  };

  if (loading) return <p>Carregando avaliação...</p>;

  return (
    <div>
      <div>
        {[1, 2, 3, 4, 5].map((n) => (
          <span
            key={n}
            style={{
              cursor: "pointer",
              color: n <= stars ? "gold" : "gray",
              fontSize: "1.3rem",
            }}
            onClick={() => submitRating(n)}
          >
            ★
          </span>
        ))}
      </div>

      <small>Média: ⭐ {average.toFixed(1)}</small>

      {ratings.length > 0 && (
        <div className="mt-2">
          {ratings.map((r) => (
            <div key={r.id}>
              ⭐ {r.stars} {r.review && `— ${r.review}`}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
