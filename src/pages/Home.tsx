import Layout from "../components/Layout";
import ProductList from "../components/ProductList";
import { getProductsByCategory } from "../utils/productUtils";

function Home() {
  return (
    <>
      <Layout>
        <div className="gap-5 flex flex-col items-center justify-center">
          <ProductList
            title="Processadores"
            products={getProductsByCategory("processors")}
          />

          <ProductList
            title="Memórias"
            products={getProductsByCategory("memory")}
          />

          <ProductList
            title="Placas de Vídeo"
            products={getProductsByCategory("graphics")}
          />
        </div>
      </Layout>
    </>
  );
}

export default Home;
