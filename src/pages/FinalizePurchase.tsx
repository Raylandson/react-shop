import Layout from "../components/Layout";

function FinalizePurchase() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-6">
          Finalizar Compra
        </h1>
        <div className="bg-white rounded shadow-md p-8 w-full max-w-md flex flex-col items-center">
          <p className="text-gray-700 text-lg mb-4">
            Obrigado por escolher a React Shop!
          </p>
          <button className="bg-amber-400 hover:bg-amber-500 text-sky-950 font-semibold px-6 py-3 rounded transition-colors">
            Confirmar Compra
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default FinalizePurchase;
