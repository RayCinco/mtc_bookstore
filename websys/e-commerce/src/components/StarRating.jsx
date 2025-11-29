import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function StarRating({ rating, className = "" }) {
  const stars = [...Array(5)].map((_, index) => {
    const starIndex = index + 1;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.25 && rating % 1 < 0.75;

    if (starIndex <= fullStars) {
      return <FaStar key={index} className="text-primary" />;
    } else if (starIndex === fullStars + 1 && hasHalfStar) {
      return <FaStarHalfAlt key={index} className="text-primary" />;
    } else {
      return <FaRegStar key={index} className="text-muted" />;
    }
  });

  return (
    <div className={`star-rating ${className}`} style={{ fontSize: "1rem" }}>
      {stars}
    </div>
  );
}

export default StarRating;
