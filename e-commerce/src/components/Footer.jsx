import { useState } from "react";
import { Link } from "react-router-dom";

function Footer() {
  const [newsletterData, setNewsletterData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const companyInfo = {
    name: "EShopper",
    description:
      "Your premier destination for quality products and exceptional shopping experience. We offer a wide range of products with fast delivery and excellent customer service.",
    address: "123 Street, New York, USA",
    email: "info@eshopper.com",
    phone: "+012 345 67890",
  };

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Our Shop", path: "/shop" },
    { name: "Shop Detail", path: "/product" },
    { name: "Shopping Cart", path: "/cart" },
    { name: "Checkout", path: "/checkout" },
    { name: "Contact Us", path: "/contact" },
  ];

  const customerService = [
    { name: "About Us", path: "/about" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Return Policy", path: "/returns" },
    { name: "FAQ", path: "/faq" },
    { name: "Support", path: "/support" },
  ];

  const handleNewsletterChange = (e) => {
    const { name, value } = e.target;
    setNewsletterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would typically make an API call to subscribe the user
      console.log("Newsletter subscription:", newsletterData);

      setSubmitMessage("Thank you for subscribing to our newsletter!");
      setNewsletterData({ name: "", email: "" });
    } catch (error) {
      setSubmitMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <div className="container-fluid bg-secondary text-dark mt-5 pt-5">
      <div className="row px-xl-5 pt-5">
        {/* Company Info */}
        <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
          <Link to="/" className="text-decoration-none">
            <h1 className="mb-4 display-5 font-weight-semi-bold">
              <span className="text-primary font-weight-bold border border-white px-3 mr-1">
                E
              </span>
              {companyInfo.name}
            </h1>
          </Link>
          <p className="mb-4">{companyInfo.description}</p>
          <div className="contact-info">
            <p className="mb-2">
              <i className="fa fa-map-marker-alt text-primary mr-3"></i>
              {companyInfo.address}
            </p>
            <p className="mb-2">
              <i className="fa fa-envelope text-primary mr-3"></i>
              <a href={`mailto:${companyInfo.email}`} className="text-dark">
                {companyInfo.email}
              </a>
            </p>
            <p className="mb-0">
              <i className="fa fa-phone-alt text-primary mr-3"></i>
              <a href={`tel:${companyInfo.phone}`} className="text-dark">
                {companyInfo.phone}
              </a>
            </p>
          </div>
        </div>

        {/* Links Section */}
        <div className="col-lg-8 col-md-12">
          <div className="row">
            {/* Quick Links */}
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Quick Links</h5>
              <div className="d-flex flex-column justify-content-start">
                {quickLinks.map((link, index) => (
                  <Link
                    key={index}
                    className="text-dark mb-2 text-decoration-none"
                    to={link.path}
                  >
                    <i className="fa fa-angle-right mr-2"></i>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Service */}
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">
                Customer Service
              </h5>
              <div className="d-flex flex-column justify-content-start">
                {customerService.map((link, index) => (
                  <Link
                    key={index}
                    className="text-dark mb-2 text-decoration-none"
                    to={link.path}
                  >
                    <i className="fa fa-angle-right mr-2"></i>
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">Newsletter</h5>
              <p className="mb-3">
                Subscribe to receive updates, access to exclusive deals, and
                more.
              </p>

              <form onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    className="form-control border-0 py-4"
                    placeholder="Your Name"
                    value={newsletterData.name}
                    onChange={handleNewsletterChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    className="form-control border-0 py-4"
                    placeholder="Your Email"
                    value={newsletterData.email}
                    onChange={handleNewsletterChange}
                    required
                  />
                </div>
                <div>
                  <button
                    className="btn btn-primary btn-block border-0 py-3"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Subscribing..." : "Subscribe Now"}
                  </button>
                </div>
              </form>

              {submitMessage && (
                <div
                  className={`alert mt-3 ${
                    submitMessage.includes("Thank you")
                      ? "alert-success"
                      : "alert-danger"
                  }`}
                >
                  {submitMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="row border-top border-light mx-xl-5 py-4">
        <div className="col-md-6 px-xl-0">
          <p className="mb-md-0 text-center text-md-left text-dark">
            &copy; {currentYear}{" "}
            <Link className="text-dark font-weight-semi-bold" to="/">
              {companyInfo.name}
            </Link>
            . All Rights Reserved.
            <br className="d-md-none" />
            Built with React & Bootstrap
          </p>
        </div>
        <div className="col-md-6 px-xl-0 text-center text-md-right">
          <img
            className="img-fluid"
            src="/img/payments.png"
            alt="Accepted Payment Methods"
            style={{ maxHeight: "40px" }}
          />
        </div>
      </div>
    </div>
  );
}

export default Footer;
