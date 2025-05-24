import { ShoppingCart } from "lucide-react";
import type { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  // const productTest: Product = {
  //   id: "1",
  //   name: "Processador AMD Ryzen 5 5600X, 3.7GHz (4.6GHz Turbo), 6-Cores 12-Threads, Cooler Wraith Stealth, AM4",
  //   description:
  //     "O processador AMD Ryzen 5 5600X é uma excelente opção para quem busca desempenho e eficiência em jogos e tarefas do dia a dia. Com 6 núcleos e 12 threads, ele oferece um desempenho excepcional em multitarefas e jogos exigentes.",
  //   price: 1199.0,
  //   category: "Processadores",
  //   imageUrl: "src/assets/products/ryzen-5-5600.jpg",
  // };

  const formatter: Intl.NumberFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="flex flex-col rounded-lg shadow-lg bg-cyan-100 p-4 m-4 h-80 w-64 flex-shrink-0">
      <img
        src="src/assets/products/ryzen-5-5600.jpg"
        alt="AMD Ryzen 5 5600X"
        className="h-40 w-full object-cover rounded-t-lg"
      />
      <h2 className="text-lg font-bold text-sky-950 line-clamp-2">
        {product.name}
      </h2>
      {/* <p>Description of the product.</p> */}
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-lime-600 font-bold">
            R$ {formatter.format(product.price)} á vista
          </p>
          <p className="text-sm text-gray-500">
            Em até 12x de R$ {formatter.format(product.price / 12)}
          </p>
        </div>
        <button>
          <ShoppingCart className="h-5 w-5 text-sky-950 hover:text-sky-400" />
        </button>
      </div>
    </div>
  );
}
export default ProductCard;
