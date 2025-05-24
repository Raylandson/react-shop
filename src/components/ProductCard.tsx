import { ShoppingCart } from "lucide-react";

function ProductCard() {
  return (
    <div className="flex flex-col rounded-lg shadow-lg bg-cyan-100 p-4 m-4 h-80 w-64">
      <img
        src="src/assets/products/ryzen-5-5600.jpg"
        alt="AMD Ryzen 5 5600X"
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-bold text-sky-950 line-clamp-2">
        Processador AMD Ryzen 5 5600X, 3.7GHz (4.6GHz Turbo), 6-Cores
        12-Threads, Cooler Wraith Stealth, AM4
      </h2>
      {/* <p>Description of the product.</p> */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-lime-600 font-bold">R$ 1.199,00 á vista</p>
          <p className="text-sm text-gray-500">Em até 12x de R$ 99,92</p>
        </div>
        <button>
          <ShoppingCart className="h-5 w-5 text-sky-950 hover:text-sky-400" />
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
