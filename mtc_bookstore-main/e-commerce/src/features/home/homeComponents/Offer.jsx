import { Link } from "react-router-dom";
import { defaultOffers } from "../../../utils/constants";
function Offer({ offers = null }) {
  const offersToShow = offers || defaultOffers;

  function handleOfferClick(offer) {
    // You can add analytics tracking here
    console.log("Offer clicked:", offer.title);
  }

  return (
    <div className="container-fluid offer pt-5">
      <div className="row px-xl-5">
        {offersToShow.map((offer, index) => (
          <div key={offer.id || index} className="col-md-6 pb-4">
            <div
              className={`position-relative ${
                offer.bgColor || "bg-secondary"
              } text-center ${
                offer.textAlign || "text-md-right"
              } text-white mb-2 py-5 px-5 offer-card`}
            >
              <img
                src={offer.image}
                alt={offer.title}
                className="offer-image"
                onError={(e) => {
                  e.target.src = "/img/offer-1.png"; // Fallback image
                }}
              />
              <div className="position-relative" style={{ zIndex: 1 }}>
                <h5 className="text-uppercase text-primary mb-3">
                  {offer.discount} {offer.subtitle}
                </h5>
                <h1 className="mb-4 font-weight-semi-bold">{offer.title}</h1>
                <Link
                  to={offer.link}
                  className="btn btn-outline-primary py-md-2 px-md-3"
                  onClick={() => handleOfferClick(offer)}
                >
                  {offer.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Offer;
