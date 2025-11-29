import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaAngleRight,
} from "react-icons/fa";

const companyInfo = {
  name: "Tytana Bookstore",
  address: "Macapagal Blvd, Pasay, Metro Manila, Philippines",
  email: "mtcbookstore@mtc.edu.ph",
  phone: "+0999-1234-5678",
};

const quickLinks = [
  { name: "Home", path: "/" },
  { name: "Our Shop", path: "/shop" },
];

const customerService = [
  { name: "Shopping Cart", path: "/cart" },
  { name: "Reserve", path: "/reserve" },
  { name: "Contact Us", path: "/contact" },
];

function Footer() {
  const [newsletterData, setNewsletterData] = useState({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
                Tytana
              </span>
              Bookstore
            </h1>
          </Link>
          <div className="contact-info">
            <p className="mb-2">
              <FaMapMarkerAlt className="text-primary mr-3" />
              {companyInfo.address}
            </p>
            <p className="mb-2">
              <FaEnvelope className="text-primary mr-3" />
              <a href={`mailto:${companyInfo.email}`} className="text-dark">
                {companyInfo.email}
              </a>
            </p>
            <p className="mb-0">
              <FaPhoneAlt className="text-primary mr-3" />
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
                    <FaAngleRight className="mr-2" />
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Customer Service */}
            <div className="col-md-4 mb-5">
              <h5 className="font-weight-bold text-dark mb-4">&nbsp;</h5>
              <div className="d-flex flex-column justify-content-start">
                {customerService.map((link, index) => (
                  <Link
                    key={index}
                    className="text-dark mb-2 text-decoration-none"
                    to={link.path}
                  >
                    <FaAngleRight className="mr-2" />
                    {link.name}
                  </Link>
                ))}
              </div>
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
            <br></br>All Company and Institution Names, Logos, and Trademarks
            are the property of their respective owners.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
