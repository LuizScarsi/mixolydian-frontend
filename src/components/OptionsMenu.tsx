import { menuOptions } from "../data/menuOptions";
import { useAuth } from "../contexts/AuthContext";

interface Props {
  onSelect: (route: string) => void;
  activeRoute: string;
}

export default function OptionsMenu({ onSelect, activeRoute }: Props) {
  const { role } = useAuth();

  return (
    <div className="d-flex flex-wrap justify-content-center gap-2 mb-4 w-100">
      {menuOptions
        .filter((opt) => opt.roles.includes(role!)) // 🔐 FILTRO POR ROLE
        .map((opt) => (
          <button
            key={opt.route}
            className={`btn ${
              activeRoute === opt.route
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => onSelect(opt.route)}
          >
            {opt.label}
          </button>
        ))}
    </div>
  );
}
