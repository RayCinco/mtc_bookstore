import { formatPrice } from "../../../utils/helpers";
import { useImage } from "../../../hooks/useImage";

function OrderItems({ items, total, is_reservation }) {
  const reservationFlag = is_reservation === 1 || is_reservation === true;

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <div className="mb-4">
        <h5 className="font-weight-semi-bold mb-3">
          Order Items
          {reservationFlag && (
            <span className="badge bg-warning text-dark ms-2">Reservation</span>
          )}
        </h5>
        <div className="alert alert-info">No items in this order.</div>
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h5 className="font-weight-semi-bold mb-3">
        Order Items
        {reservationFlag && (
          <span className="badge bg-warning text-dark ms-2">Reservation</span>
        )}
      </h5>
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead className="bg-light">
            <tr>
              <th>Product</th>
              <th>Size</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <OrderItem
                key={item.id}
                item={item}
                reservationFlag={reservationFlag}
              />
            ))}
          </tbody>
          <tfoot className="bg-light">
            <tr>
              <td colSpan="4" className="text-right">
                <strong>Total:</strong>
              </td>
              <td className="font-weight-bold text-primary">
                {formatPrice(total)}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default OrderItems;

function OrderItem({ item, reservationFlag }) {
  // Determine image index when image is an array (follow existing gender logic)
  const imgIndex = Array.isArray(item.image)
    ? item.gender === "Women"
      ? 1
      : 0
    : null;

  const imagePath = Array.isArray(item.image)
    ? item.image[imgIndex] || item.image[0]
    : item.image;

  const { data: productImageUrl, isLoading: isImageLoading } =
    useImage(imagePath);

  return (
    <tr>
      <td>
        <div className="d-flex align-items-center">
          <img
            src={productImageUrl || "/img/product-1.jpg"}
            alt={item.name}
            style={{
              width: 50,
              height: 50,
              objectFit: "cover",
              marginRight: 10,
              opacity: isImageLoading ? 0.6 : 1,
            }}
            onError={(e) => {
              e.target.src = "/img/product-1.jpg";
            }}
          />
          <div>
            <div>
              <span>{item.name}</span>
              {(item.is_reservation === 1 ||
                item.is_reservation === true ||
                reservationFlag) && (
                <span className="badge bg-warning text-dark ms-2">
                  Reservation
                </span>
              )}
            </div>
          </div>
        </div>
      </td>
      <td>{item.selected_size || "-"}</td>
      <td>{formatPrice(item.price || item.subtotal / item.quantity)}</td>
      <td>{item.quantity}</td>
      <td className="font-weight-medium">{formatPrice(item.subtotal)}</td>
    </tr>
  );
}
