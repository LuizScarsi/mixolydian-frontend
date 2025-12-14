import { useAuth } from "../contexts/AuthContext";
import RatingStars from "./RatingStars";

export default function DataCards({ data, onEdit, onDelete, route }: any) {
  const { role, token } = useAuth();

  // 🔐 decodificação segura do token
  let loggedUserId: number | null = null;

  try {
    if (token) {
      loggedUserId = JSON.parse(atob(token.split(".")[1])).id;
    }
  } catch {
    loggedUserId = null;
  }

  return (
    <div className="row justify-content-center g-4 mt-4 w-100">
      {data.map((item: any) => {
        console.log("ITEM DATA CARD:");
        console.log(item);
        const isUserRoute = route === "user";
        const isPlaylistRoute = route === "playlist";

        const isSelfUser = isUserRoute && item.id === loggedUserId;

        const isPlaylistOwner =
          isPlaylistRoute && item.owner_id === loggedUserId;

        const canEditPlaylist =
          isPlaylistRoute && (role === "admin" || isPlaylistOwner);

        const canDeletePlaylist =
          isPlaylistRoute && (role === "admin" || isPlaylistOwner);

        return (
          <div className="col-md-4" key={`${route}-${item.id}`}>
            <div className="card shadow-sm card-custom">
              <div className="card-body text-start">

                {/* 📄 Dados básicos */}
                <p><strong>ID:</strong> {item.id}</p>
                <p><strong>Nome:</strong> {item.name}</p>

                {item.description && (
                  <p><strong>Descrição:</strong> {item.description}</p>
                )}

                {/* 🎵 PLAYLIST INFO */}
                {isPlaylistRoute && (
                  <>
                    <p>
                      <strong>Dono:</strong> {item.owner}
                    </p>

                    <p><strong>Músicas:</strong></p>
                    {item.musics?.length === 0 && (
                      <small className="text-muted">Nenhuma música</small>
                    )}

                    <ul>
                      {item.musics?.map((m: any) => (
                        <li key={m.id}>{m.name}</li>
                      ))}
                    </ul>

                    <div className="mt-2">
                      <strong>Avaliação:</strong>
                      <RatingStars
                        key={`rating-${item.id}`}
                        playlistId={Number(item.id)}
                      />
                    </div>
                  </>
                )}

                {/* 🎛️ AÇÕES */}
                <div className="mt-3">

                  {/* ✏️ EDITAR */}
                  {onEdit && (
                    <>
                      {(!isPlaylistRoute || canEditPlaylist) && (
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => onEdit(item)}
                        >
                          Editar
                        </button>
                      )}
                    </>
                  )}

                  {/* ❌ EXCLUIR */}
                  {onDelete && (
                    <>
                      {/* impedir admin de deletar a si mesmo */}
                      {!isSelfUser && (!isPlaylistRoute || canDeletePlaylist) && (
                        <button
                          className="btn btn-danger"
                          onClick={() => onDelete(item)}
                        >
                          Excluir
                        </button>
                      )}

                      {isSelfUser && (
                        <small className="text-muted">
                          (Você não pode excluir sua própria conta)
                        </small>
                      )}
                    </>
                  )}
                </div>

              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
