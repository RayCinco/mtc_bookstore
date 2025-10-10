import { useState, useEffect } from "react";

// Default store information
const defaultStores = [
  {
    id: 1,
    name: "Main Store",
    address: "123 Fashion Street, New York, USA",
    email: "info@eshopper.com",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Sat: 9AM-8PM, Sun: 11AM-6PM",
  },
  {
    id: 2,
    name: "Downtown Branch",
    address: "456 Shopping Ave, New York, USA",
    email: "downtown@eshopper.com",
    phone: "+1 (555) 987-6543",
    hours: "Mon-Fri: 10AM-9PM, Weekends: 10AM-7PM",
  },
];

const currentStores = defaultStores;

function ContactContent({ onSubmit, stores = null }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  // Form validation rules
  function validateField(name, value) {
    switch (name) {
      case "name":
        if (!value.trim()) return "Please enter your name";
        if (value.trim().length < 2)
          return "Name must be at least 2 characters";
        return "";

      case "email":
        if (!value.trim()) return "Please enter your email";
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value))
          return "Please enter a valid email address";
        return "";

      case "subject":
        if (!value.trim()) return "Please enter a subject";
        if (value.trim().length < 5)
          return "Subject must be at least 5 characters";
        return "";

      case "message":
        if (!value.trim()) return "Please enter your message";
        if (value.trim().length < 10)
          return "Message must be at least 10 characters";
        return "";

      default:
        return "";
    }
  }

  function handleInputChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    // Real-time validation for better UX
    const error = validateField(name, value);
    if (error && value.trim()) {
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  }

  function validateForm() {
    const newErrors = {};

    Object.keys(formData).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //STAY EMPTY
  function handleSubmit(e) {}

  function getInputClass(fieldName) {
    let baseClass = "form-control";
    if (errors[fieldName]) {
      baseClass += " is-invalid";
    } else if (formData[fieldName] && !errors[fieldName]) {
      baseClass += " is-valid";
    }
    return baseClass;
  }

  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Contact For Any Queries</span>
        </h2>
      </div>

      <div className="row px-xl-5">
        {/* Contact Form */}
        <div className="col-lg-7 mb-5">
          <div className="contact-form">
            {/* Success/Error Message */}
            {submitMessage && (
              <div
                className={`alert ${
                  isSubmitted ? "alert-success" : "alert-danger"
                } mb-4`}
              >
                <i
                  className={`fa ${
                    isSubmitted ? "fa-check-circle" : "fa-exclamation-triangle"
                  } mr-2`}
                ></i>
                {submitMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Name Field */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={getInputClass("name")}
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                {errors.name && (
                  <div className="invalid-feedback d-block">
                    <i className="fa fa-exclamation-circle mr-1"></i>
                    {errors.name}
                  </div>
                )}
              </div>

              {/* Email Field */}
              <div className="form-group mb-3">
                <input
                  type="email"
                  className={getInputClass("email")}
                  id="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                {errors.email && (
                  <div className="invalid-feedback d-block">
                    <i className="fa fa-exclamation-circle mr-1"></i>
                    {errors.email}
                  </div>
                )}
              </div>

              {/* Subject Field */}
              <div className="form-group mb-3">
                <input
                  type="text"
                  className={getInputClass("subject")}
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                />
                {errors.subject && (
                  <div className="invalid-feedback d-block">
                    <i className="fa fa-exclamation-circle mr-1"></i>
                    {errors.subject}
                  </div>
                )}
              </div>

              {/* Message Field */}
              <div className="form-group mb-4">
                <textarea
                  className={getInputClass("message")}
                  rows="6"
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                ></textarea>
                {errors.message && (
                  <div className="invalid-feedback d-block">
                    <i className="fa fa-exclamation-circle mr-1"></i>
                    {errors.message}
                  </div>
                )}
                <small className="form-text text-muted">
                  {formData.message.length}/500 characters
                </small>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  className="btn btn-primary py-2 px-4"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <i className="fa fa-spinner fa-spin mr-2"></i>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="fa fa-paper-plane mr-2"></i>
                      Send Message
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Store Information */}
        <div className="col-lg-5 mb-5">
          <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
          <p className="mb-4">
            We're here to help! Whether you have questions about our products,
            need assistance with an order, or want to provide feedback, don't
            hesitate to reach out. Our team is ready to assist you.
          </p>

          {/* Store Locations */}
          {currentStores.map((store, index) => (
            <div
              key={store.id}
              className={`d-flex flex-column ${
                index < currentStores.length - 1 ? "mb-4" : ""
              }`}
            >
              <h5 className="font-weight-semi-bold mb-3">{store.name}</h5>

              <div className="mb-2">
                <i className="fa fa-map-marker-alt text-primary mr-3"></i>
                <span>{store.address}</span>
              </div>

              <div className="mb-2">
                <i className="fa fa-envelope text-primary mr-3"></i>
                <a href={`mailto:${store.email}`} className="text-dark">
                  {store.email}
                </a>
              </div>

              <div className="mb-2">
                <i className="fa fa-phone-alt text-primary mr-3"></i>
                <a href={`tel:${store.phone}`} className="text-dark">
                  {store.phone}
                </a>
              </div>

              {store.hours && (
                <div className="mb-2">
                  <i className="fa fa-clock text-primary mr-3"></i>
                  <span className="text-muted">{store.hours}</span>
                </div>
              )}
            </div>
          ))}

          {/* Additional Contact Methods */}
          <div className="mt-4 p-3 bg-light rounded">
            <h6 className="font-weight-semi-bold mb-3">
              Other Ways to Reach Us
            </h6>
            <div className="d-flex flex-wrap">
              <a href="#" className="btn btn-outline-primary btn-sm mr-2 mb-2">
                <i className="fab fa-facebook-f mr-1"></i>
                Facebook
              </a>
              <a href="#" className="btn btn-outline-primary btn-sm mr-2 mb-2">
                <i className="fab fa-twitter mr-1"></i>
                Twitter
              </a>
              <a href="#" className="btn btn-outline-primary btn-sm mr-2 mb-2">
                <i className="fab fa-instagram mr-1"></i>
                Instagram
              </a>
              <a href="#" className="btn btn-outline-primary btn-sm mb-2">
                <i className="fa fa-comments mr-1"></i>
                Live Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactContent;
