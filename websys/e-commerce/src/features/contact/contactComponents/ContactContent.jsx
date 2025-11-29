import { useState } from "react";
import {
  FaExclamationCircle,
  FaSpinner,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhoneAlt,
  FaClock,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";
import { useUser } from "../../auth/authHooks/useUser";
import useCreateContact from "../contactHooks/useCreateContact";
import Spinner from "../../../components/Spinner";
// Default store information
const defaultStores = [
  {
    id: 1,
    name: "Campus Store",
    address: "Macapagal Blvd, Pasay, Metro Manila, Philippines",
    email: "mtcbookstore@mtc.edu.ph",
    phone: "+1 (555) 123-4567",
    hours: "Mon-Sat: 9AM-5PM",
  },
];

const currentStores = defaultStores;

function ContactContent({ onSubmit, stores = null }) {
  const { isLoading, user } = useUser();
  const { createContact, isLoading: isContacting } = useCreateContact();

  const [formData, setFormData] = useState({
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

    // Only validate subject and message; name/email come from authenticated user
    ["subject", "message"].forEach((field) => {
      const error = validateField(field, formData[field] || "");
      if (error) newErrors[field] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  //STAY EMPTY
  async function handleSubmit(e) {
    e.preventDefault();

    // Ensure user exists (we rely on authenticated user for name/email)
    if (!user) {
      setSubmitMessage("You must be logged in to send a message.");
      setIsSubmitted(false);
      return;
    }

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const payload = {
      name: user.name,
      email: user.email,
      subject: formData.subject,
      message: formData.message,
    };

    // Use mutation with callbacks
    createContact(payload, {
      onSuccess: (res) => {
        setIsSubmitting(false);
        setIsSubmitted(true);
        setSubmitMessage(
          "Message sent successfully. We'll get back to you soon."
        );
        setFormData({ subject: "", message: "" });
      },
      onError: (err) => {
        setIsSubmitting(false);
        setIsSubmitted(false);
        const msg = err?.message || "Failed to send message";
        setSubmitMessage(msg);
      },
    });
  }

  function getInputClass(fieldName) {
    let baseClass = "form-control";
    if (errors[fieldName]) {
      baseClass += " is-invalid";
    } else if (formData[fieldName] && !errors[fieldName]) {
      baseClass += " is-valid";
    }
    return baseClass;
  }

  if (isLoading) {
    return <Spinner />;
  }
  return (
    <div className="container-fluid pt-5">
      <div className="text-center mb-4">
        <h2 className="section-title px-5">
          <span className="px-2">Contact For Any Queries</span>
        </h2>
      </div>

      <div className="row px-xl-5">
        <ContactForm
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          isContacting={isContacting}
          isSubmitted={isSubmitted}
          submitMessage={submitMessage}
          onInputChange={handleInputChange}
          onSubmit={handleSubmit}
          getInputClass={getInputClass}
        />
        <StoreInformation stores={currentStores} />
      </div>
    </div>
  );
}

export default ContactContent;

// Contact Form Component
function ContactForm({
  formData,
  errors,
  isSubmitting,
  isContacting,
  isSubmitted,
  submitMessage,
  onInputChange,
  onSubmit,
  getInputClass,
}) {
  return (
    <div className="col-lg-7 mb-5">
      <div className="contact-form">
        {submitMessage && (
          <SubmitMessage isSubmitted={isSubmitted} message={submitMessage} />
        )}

        <form onSubmit={onSubmit} noValidate>
          {/* Name and email are taken from authenticated user, not collected here */}

          <FormField
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            error={errors.subject}
            onChange={onInputChange}
            getInputClass={getInputClass}
          />

          <FormField
            type="textarea"
            name="message"
            placeholder="Your Message"
            value={formData.message}
            error={errors.message}
            onChange={onInputChange}
            getInputClass={getInputClass}
            rows={6}
            showCharCount
          />

          <SubmitButton isSubmitting={isSubmitting || isContacting} />
        </form>
      </div>
    </div>
  );
}

// Submit Message Component
function SubmitMessage({ isSubmitted, message }) {
  const Icon = isSubmitted ? FaCheckCircle : FaExclamationTriangle;

  return (
    <div
      className={`alert ${isSubmitted ? "alert-success" : "alert-danger"} mb-4`}
    >
      <Icon className="mr-2" />
      {message}
    </div>
  );
}

// Form Field Component
function FormField({
  type,
  name,
  placeholder,
  value,
  error,
  onChange,
  getInputClass,
  rows,
  showCharCount,
}) {
  return (
    <div className="form-group mb-3">
      {type === "textarea" ? (
        <textarea
          className={getInputClass(name)}
          rows={rows}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        ></textarea>
      ) : (
        <input
          type={type}
          className={getInputClass(name)}
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required
        />
      )}
      {error && (
        <div className="invalid-feedback d-block">
          <FaExclamationCircle className="mr-1" />
          {error}
        </div>
      )}
      {showCharCount && (
        <small className="form-text text-muted">
          {value.length}/500 characters
        </small>
      )}
    </div>
  );
}

// Submit Button Component
function SubmitButton({ isSubmitting }) {
  return (
    <div>
      <button
        className="btn btn-primary py-2 px-4"
        type="submit"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <FaSpinner className="fa-spin mr-2" />
            Sending...
          </>
        ) : (
          <>
            <FaPaperPlane className="mr-2" />
            Send Message
          </>
        )}
      </button>
    </div>
  );
}

// Store Information Component
function StoreInformation({ stores }) {
  return (
    <div className="col-lg-5 mb-5">
      <h5 className="font-weight-semi-bold mb-3">Get In Touch</h5>
      <p className="mb-4">
        We're here to help! Whether you have questions about our products, need
        assistance with an order, or want to provide feedback, don't hesitate to
        reach out. Our team is ready to assist you.
      </p>

      {stores.map((store, index) => (
        <StoreCard
          key={store.id}
          store={store}
          isLast={index === stores.length - 1}
        />
      ))}
    </div>
  );
}

// Store Card Component
function StoreCard({ store, isLast }) {
  return (
    <div className={`d-flex flex-column ${!isLast ? "mb-4" : ""}`}>
      <h5 className="font-weight-semi-bold mb-3">{store.name}</h5>

      <ContactInfo icon="fa-map-marker-alt" text={store.address} type="text" />

      <ContactInfo
        icon="fa-envelope"
        text={store.email}
        type="email"
        href={`mailto:${store.email}`}
      />

      <ContactInfo
        icon="fa-phone-alt"
        text={store.phone}
        type="phone"
        href={`tel:${store.phone}`}
      />

      {store.hours && (
        <ContactInfo icon="fa-clock" text={store.hours} type="hours" />
      )}
    </div>
  );
}

// Contact Info Component
function ContactInfo({ icon, text, type, href }) {
  const iconMap = {
    "fa-map-marker-alt": FaMapMarkerAlt,
    "fa-envelope": FaEnvelope,
    "fa-phone-alt": FaPhoneAlt,
    "fa-clock": FaClock,
  };

  const IconComponent = iconMap[icon];

  return (
    <div className="mb-2">
      {IconComponent && <IconComponent className="text-primary mr-3" />}
      {href ? (
        <a href={href} className="text-dark">
          {text}
        </a>
      ) : (
        <span className={type === "hours" ? "text-muted" : ""}>{text}</span>
      )}
    </div>
  );
}
