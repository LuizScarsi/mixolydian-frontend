export default function DataCards({ data, onEdit, onDelete }: any) {
  return (
    <div className="row justify-content-center g-4 mt-4 w-100">
      {data.map((item: any, i: number) => (
        <div className="col-md-4" key={i}>
          <div className="card shadow-sm card-custom">
            <div className="card-body text-start">

              {Object.entries(item).map(([key, value]) => (
                <p key={key}><strong>{key}:</strong> {String(value)}</p>
              ))}

              {onEdit && (
                <button className="btn btn-warning me-2" onClick={() => onEdit(item)}>
                  Editar
                </button>
              )}
              {onDelete && (
                <button className="btn btn-danger" onClick={() => onDelete(item)}>
                  Excluir
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}


