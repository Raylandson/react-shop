import { Cpu, Gpu, Microchip } from "lucide-react";
import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import { getProductsByCategory } from "../utils/productUtils";

function Home() {
  return (
    <>
      <Layout>
        <div className="gap-0 flex flex-col">
          <ProductList
            title="Processadores"
            icon={<Cpu className="text-white"></Cpu>}
            products={getProductsByCategory("processors")}
          />

          <ProductList
            title="Memórias"
            icon={<Microchip className="text-white"></Microchip>}
            products={getProductsByCategory("memory")}
          />

          <ProductList
            title="Placas de Vídeo"
            icon={<Gpu className="text-white"></Gpu>}
            products={getProductsByCategory("graphics")}
          />
        </div>
      </Layout>
    </>
  );
}

export default Home;
