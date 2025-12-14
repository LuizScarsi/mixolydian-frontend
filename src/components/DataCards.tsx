// import RatingStars from "./RatingStars";
// import { useAuth } from "../contexts/AuthContext.tsx";

// export default function DataCards({ data, onEdit, onDelete, route }: any) {
//   const { role, token } = useAuth();
//   const loggedUserId = JSON.parse(atob(token!.split(".")[1])).id;

//   return (
//     <div className="row justify-content-center g-4 mt-4 w-100">
//       {data.map((item: any) => (
//         <div className="col-md-4" key={`${route}-${item.id}`}>
//           <div className="card shadow-sm card-custom">
//             <div className="card-body text-start">

//               {Object.entries(item).map(([key, value]) => (
//                 <p key={key}>
//                   <strong>{key}:</strong> {String(value)}
//                 </p>
//               ))}

//               {/* ⭐ RATING APENAS PARA PLAYLIST */}
//               {route === "playlist" && (
//                 <div className="mt-2">
//                   <strong>Avaliação:</strong>
//                   <RatingStars
//                     key={`rating-${item.id}`}
//                     playlistId={Number(item.id)}
//                   />
//                 </div>
//               )}

//               <div className="mt-3">
//                 {onEdit && (
//                   <button
//                     className="btn btn-warning me-2"
//                     onClick={() => onEdit(item)}
//                   >
//                     Editar
//                   </button>
//                 )}
//                 {onDelete && !isSelf && (
//                   <button
//                     className="btn btn-danger"
//                     onClick={() => onDelete(item)}
//                   >
//                     Excluir
//                   </button>
//                 )}
//                 {isSelf && (
//                   <button className="btn btn-secondary" disabled>
//                     Não pode excluir a si mesmo
//                   </button>
//                 )}
//               </div>

//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { useAuth } from "../contexts/AuthContext";
import RatingStars from "./RatingStars";

export default function DataCards({ data, onEdit, onDelete, route }: any) {
  const { role, token } = useAuth();

  // decodificar o id do usuário do token (ou pegar do contexto, se você já salva)
  const loggedUserId = JSON.parse(
    atob(token!.split(".")[1])
  ).id;

  return (
    <div className="row justify-content-center g-4 mt-4 w-100">
      {data.map((item: any) => {
        const isSelf = route === "user" && item.id === loggedUserId;

        return (
          <div className="col-md-4" key={`${route}-${item.id}`}>
            <div className="card shadow-sm card-custom">
              <div className="card-body text-start">

                {Object.entries(item).map(([key, value]) => (
                  <p key={key}>
                    <strong>{key}:</strong> {String(value)}
                  </p>
                ))}

                {/* ⭐ RATING APENAS PARA PLAYLIST */}
                {route === "playlist" && (
                  <div className="mt-2">
                    <strong>Avaliação:</strong>
                    <RatingStars
                      key={`rating-${item.id}`}
                      playlistId={Number(item.id)}
                    />
                  </div>
                )}

                <div className="mt-3">
                  {onEdit && (
                    <button
                      className="btn btn-warning me-2"
                      onClick={() => onEdit(item)}
                    >
                      Editar
                    </button>
                  )}

                  {/* ❌ esconder delete se for o próprio usuário */}
                  {onDelete && !isSelf && (
                    <button
                      className="btn btn-danger"
                      onClick={() => onDelete(item)}
                    >
                      Excluir
                    </button>
                  )}

                  {isSelf && (
                    <small className="text-muted">
                      (Você não pode excluir sua própria conta)
                    </small>
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

