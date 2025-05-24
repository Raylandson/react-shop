import Layout from "../components/Layout";
import ProductCard from "../components/ProductCard";

function Home() {
  return (
    <>
      <Layout>
        <h1 className="text-4xl text-white font-bold">Home Page</h1>
        <div className="flex flex-nowrap overflow-x-scroll scrollbar-hide w-full">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Layout>
    </>
  );
}

export default Home;
