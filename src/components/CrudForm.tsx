import { useState } from "react";
import { formFields } from "../data/formFields";

interface Props {
  initialData: any;
  route: string;          // <--- precisa da rota
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

export default function CrudForm({ initialData, route, onSubmit, onCancel }: Props) {
  const fields = formFields[route];
  const [form, setForm] = useState(initialData);

  const handle = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="card p-3 mt-4">
      <h4>{form.id ? "Editar Registro" : "Novo Registro"}</h4>

      {fields.map((key) => (
        <div key={key} className="mb-3">
          <label className="form-label">{key}</label>
          <input
            className="form-control"
            name={key}
            value={form[key] ?? ""}
            onChange={handle}
          />
        </div>
      ))}

      <button className="btn btn-primary me-2" onClick={() => onSubmit(form)}>
        Salvar
      </button>

      <button className="btn btn-secondary" onClick={onCancel}>
        Cancelar
      </button>
    </div>
  );
}

