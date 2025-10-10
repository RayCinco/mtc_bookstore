function Features({ features = null }) {
  // Default features data
  const defaultFeatures = [
    {
      id: 1,
      icon: "fa fa-check",
      title: "Quality Products",
      description: "Premium quality products with rigorous testing",
    },
    {
      id: 2,
      icon: "fa fa-shipping-fast",
      title: "Free Shipping",
      description: "Free shipping on orders over $50",
    },
    {
      id: 3,
      icon: "fas fa-exchange-alt",
      title: "14-Day Return",
      description: "Easy returns within 14 days of purchase",
    },
    {
      id: 4,
      icon: "fa fa-phone-volume",
      title: "24/7 Support",
      description: "Round-the-clock customer support",
    },
  ];

  const featuresToShow = features || defaultFeatures;

  return (
    <div className="container-fluid pt-5">
      <div className="row px-xl-5 pb-3">
        {featuresToShow.map((feature, index) => (
          <div
            key={feature.id || index}
            className="col-lg-3 col-md-6 col-sm-12 pb-1"
          >
            <div
              className="d-flex align-items-center border mb-4 feature-item"
              style={{ padding: "30px" }}
            >
              <h1 className={`${feature.icon} text-primary m-0 mr-3`}></h1>
              <div>
                <h5 className="font-weight-semi-bold m-0">{feature.title}</h5>
                {feature.description && (
                  <small className="text-muted mt-1 d-block">
                    {feature.description}
                  </small>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features;
