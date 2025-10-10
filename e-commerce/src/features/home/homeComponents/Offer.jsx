import { Link } from "react-router-dom";

function Offer({ offers = null }) {
  // Default offers data
  const defaultOffers = [
    {
      id: 1,
      discount: "20% off",
      title: "Spring Collection",
      subtitle: "the all order",
      image: "/img/offer-1.png",
      buttonText: "Shop Now",
      link: "/shop?collection=spring",
      textAlign: "text-md-right",
      bgColor: "bg-secondary",
    },
    {
      id: 2,
      discount: "20% off",
      title: "Winter Collection",
      subtitle: "the all order",
      image: "/img/offer-2.png",
      buttonText: "Shop Now",
      link: "/shop?collection=winter",
      textAlign: "text-md-left",
      bgColor: "bg-secondary",
    },
  ];

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
