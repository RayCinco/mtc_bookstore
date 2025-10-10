import { Link } from "react-router";
function ShopProductCard({ product, handleAddToCart, handleViewProduct }) {
  return (
    <div key={product.id} className="col-lg-4 col-md-6 col-sm-12 pb-1">
      <div className="card product-item border-0 mb-4">
        <div className="card-header product-img position-relative overflow-hidden bg-transparent border p-0">
          <img
            className="img-fluid w-100"
            src={product.image}
            alt={product.name}
            onError={(e) => {
              e.target.src = "/img/product-1.jpg"; // Fallback image
            }}
          />
          {product.originalPrice > product.price && (
            <div
              className="position-absolute"
              style={{ top: "10px", right: "10px" }}
            >
              <span className="badge badge-danger">SALE</span>
            </div>
          )}
        </div>
        <div className="card-body border-left border-right text-center p-0 pt-4 pb-3">
          <h6 className="text-truncate mb-3">{product.name}</h6>
          <div className="d-flex justify-content-center">
            <h6>${product.price.toFixed(2)}</h6>
            {product.originalPrice && product.originalPrice > product.price && (
              <h6 className="text-muted ml-2">
                <del>${product.originalPrice.toFixed(2)}</del>
              </h6>
            )}
          </div>
          {product.rating && (
            <div className="d-flex justify-content-center mb-2">
              {[...Array(5)].map((_, i) => (
                <i
                  key={i}
                  className={`fa fa-star ${
                    i < Math.floor(product.rating)
                      ? "text-warning"
                      : "text-muted"
                  }`}
                  style={{ fontSize: "0.8rem" }}
                ></i>
              ))}
              <small className="ml-2 text-muted">({product.rating})</small>
            </div>
          )}
        </div>
        <div className="card-footer d-flex justify-content-between bg-light border">
          <Link
            to={`/product/${product.id}`}
            className="btn btn-sm text-dark p-0 border-0 bg-transparent text-decoration-none"
            onClick={() => handleViewProduct(product)}
          >
            <i className="fas fa-eye text-primary mr-1"></i>View Detail
          </Link>
          <button
            onClick={() => handleAddToCart(product)}
            className="btn btn-sm text-dark p-0 border-0 bg-transparent"
          >
            <i className="fas fa-shopping-cart text-primary mr-1"></i>
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShopProductCard;
