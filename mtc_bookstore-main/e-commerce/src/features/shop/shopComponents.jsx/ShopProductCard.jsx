import ProductCard from "../../../components/ProductCard";
import { EmptyCategory } from "../../../components/Empty";
function ShopProductCard({ products, category }) {
  return (
    <div className="row px-xl-5 pb-3">
      {products.length === 0 ? (
        <EmptyCategory category={category} />
      ) : (
        products.map((product) => (
          <div key={product.id} className="col-lg-3 col-md-6 col-sm-12 pb-1">
            <ProductCard product={product} />
          </div>
        ))
      )}
    </div>
  );
}

export default ShopProductCard;
