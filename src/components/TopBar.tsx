import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  function onCartClick() {
    navigate("/cart");
  }

  return (
    <nav className="bg-sky-300 p-4 shadow-md">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold text-sky-950 hover:text-sky-400"
        >
          React Store
        </button>
        <button onClick={onCartClick}>
          <ShoppingCart className="text-sky-950 hover:text-sky-400" size={24} />
        </button>
      </div>
    </nav>
  );
}
export default TopBar;
