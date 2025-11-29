import { FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Empty() {
  return <div>Empty</div>;
}

export default Empty;

export function EmptyProduct() {
  const navigate = useNavigate();
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col-12 text-center py-5">
          <h3 className="mb-4">Product not found</h3>
          <p className="text-muted">
            The product you're looking for doesn't exist.
          </p>
          <div>
            <button
              className="btn btn-primary mr-2"
              onClick={() => navigate(-1)}
            >
              Go Back
            </button>
            <button
              className="btn btn-outline-primary"
              onClick={() => navigate("/shop")}
            >
              Go to Shop
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Empty Cart Component
export function EmptyCart() {
  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5">
        <div className="col-12 text-center">
          <div className="card border-secondary">
            <div className="card-body py-5">
              <FaShoppingCart className="fa-4x text-muted mb-4" />
              <h4 className="font-weight-semi-bold mb-3">Your Cart is Empty</h4>
              <p className="text-muted mb-4">
                Looks like you haven't added any items to your cart yet.
              </p>
              <Link to="/shop" className="btn btn-primary">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function EmptyCategory({ category }) {
  const navigate = useNavigate();
  return (
    <div className="container-fluid py-5">
      <div className="row px-xl-5">
        <div className="col-12 text-center py-5">
          <h3 className="mb-4">No products in the {category} category</h3>
          <p className="text-muted">
            There are no items in this category right now. Try browsing other
            categories or check back later.
          </p>
          <div>
            <Link to="/home" className="btn btn-primary mr-2">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
