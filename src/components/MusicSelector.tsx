import { useEffect, useState } from "react";
import { api } from "../services/api";

interface Props {
  selected: number[];
  onChange: (ids: number[]) => void;
}

export default function MusicSelector({ selected, onChange }: Props) {
  const [musics, setMusics] = useState<any[]>([]);

  useEffect(() => {
    api.get("/music/all").then((res) => {
      setMusics(res.data.musics ?? res.data);
    });
  }, []);

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      onChange(selected.filter((m) => m !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <div className="card p-3">
      <h5>Músicas disponíveis</h5>

      <div style={{ maxHeight: 400, overflowY: "auto" }}>
        {musics.map((m) => (
          <div key={m.id} className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              checked={selected.includes(m.id)}
              onChange={() => toggle(m.id)}
            />
            <label className="form-check-label">
              {m.name}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
