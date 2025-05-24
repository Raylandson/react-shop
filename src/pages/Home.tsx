import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <>
      <Layout>
        <h1 className="text-4xl text-white font-bold">Home Page</h1>
        <ProductCard />
      </Layout>
    </>
  );
}

export default Home;
