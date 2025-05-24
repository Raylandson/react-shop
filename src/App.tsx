import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import type { Product } from "./types/Product";
import type { CartProduct } from "./types/CartProduct";

function App() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      product: {
        id: "1",
        name: "Processador AMD Ryzen 5 5600X, 3.7GHz (4.6GHz Turbo), 6-Cores 12-Threads, Cooler Wraith Stealth, AM4",
        description:
          "O processador AMD Ryzen 5 5600X é uma excelente opção para quem busca desempenho e eficiência em jogos e tarefas do dia a dia. Com 6 núcleos e 12 threads, ele oferece um desempenho excepcional em multitarefas e jogos exigentes.",
        price: 1199.0,
        imageUrl: "src/assets/products/ryzen-5-5600.jpg",
      },
      quantity: 1,
      totalPrice: 1199.0,
    },
    {
      product: {
        id: "2",
        name: "Placa de Vídeo GeForce RTX 3060 Ti, 8GB GDDR6, PCI Express, DVI-D, HDMI, DisplayPort",
        description:
          "A placa de vídeo GeForce RTX 3060 Ti é uma excelente escolha para gamers que buscam desempenho em jogos modernos. Com 8GB de memória GDDR6 e suporte a Ray Tracing, ela oferece gráficos impressionantes e alta taxa de quadros.",
        price: 2999.0,
        imageUrl: "src/assets/products/rtx-3060-ti.jpg",
      },
      quantity: 1,
      totalPrice: 2999.0,
    },
  ]);

  return (
    <>
      <Home />
      {/* <h1>Welcome to the App!</h1> */}
    </>
  );
}

export default App;
