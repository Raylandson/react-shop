import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
// import { createContext, useState } from "react";

// export const topBarContext = createContext(undefined);

function TopBar() {
  const navigate = useNavigate();
  function onCartClick() {
    navigate("/cart");
  }

  return (
    <nav className="bg-[#5DADE2] p-4 shadow-md">
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
