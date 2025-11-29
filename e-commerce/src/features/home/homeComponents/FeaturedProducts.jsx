import ProductCarousel from "../../../components/ProductCarousel";
import { useProducts } from "../../product/productHooks/useProducts";
import Spinner from "../../../components/Spinner";
function FeaturedProducts() {
  const { products, isLoading } = useProducts();

  if (isLoading) return <Spinner />;
  const featuredProducts = products
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8);

  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Popular Products</span>
        </h2>
      </div>
      <div className="row px-xl-5 pb-3">
        <div className="col">
          <ProductCarousel
            products={featuredProducts}
            className="product-carousel"
          />
        </div>
      </div>
    </div>
  );
}

export default FeaturedProducts;
