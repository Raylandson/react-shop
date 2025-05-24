import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

function TopBar() {
  const navigate = useNavigate();
  function onCartClick() {
    navigate("/cart");
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-sky-300 p-4 shadow-md z-index-10">
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
