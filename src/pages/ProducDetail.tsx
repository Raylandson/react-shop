import Layout from "../components/Layout";
import type { Product } from "../types/Product";
import { formatPrice } from "../utils/productUtils";

interface ProductDetailProps {
  product: Product;
}

function ProductDetail({ product }: ProductDetailProps) {
  return (
    <Layout>
      <div className="text-white">
        <div className="mb-8">
          <img
            className="w-full h-64 object-cover"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <p className="text-lg">{product.description}</p>
          <p className="text-xl font-bold">{formatPrice(product.price)}</p>
        </div>
        <div className="mt-8">
          <h1 className="text-4xl font-bold">Product Details</h1>
          {/* Product information will go here */}
        </div>
      </div>
    </Layout>
  );
}

export default ProductDetail;
