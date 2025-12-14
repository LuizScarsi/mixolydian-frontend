// export default function DataCards({ data, onEdit, onDelete }: any) {
//   return (
//     <div className="row justify-content-center g-4 mt-4 w-100">
//       {data.map((item: any, i: number) => (
//         <div className="col-md-4" key={i}>
//           <div className="card shadow-sm card-custom">
//             <div className="card-body text-start">

//               {Object.entries(item).map(([key, value]) => (
//                 <p key={key}><strong>{key}:</strong> {String(value)}</p>
//               ))}

//               {onEdit && (
//                 <button className="btn btn-warning me-2" onClick={() => onEdit(item)}>
//                   Editar
//                 </button>
//               )}
//               {onDelete && (
//                 <button className="btn btn-danger" onClick={() => onDelete(item)}>
//                   Excluir
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

import RatingStars from "./RatingStars";

export default function DataCards({ data, onEdit, onDelete, route }: any) {
  return (
    <div className="row justify-content-center g-4 mt-4 w-100">
      {data.map((item: any) => (
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
                {onDelete && (
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(item)}
                  >
                    Excluir
                  </button>
                )}
              </div>

            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
