import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faStar,
  faStarHalfAlt,
  faStar as faStarEmpty,
} from '@fortawesome/free-solid-svg-icons';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, maxRating = 10 }) => {
  const starRating = (rating / maxRating) * 5; // Convert to 5-star rating
  const fullStars = Math.floor(starRating);
  const halfStars = starRating % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStars;

  return (
    <div className="flex items-center">
      {Array(fullStars)
        .fill(0)
        .map((_, index) => (
          <FontAwesomeIcon
            key={`full-${index}`}
            icon={faStar}
            className="text-yellow-400"
          />
        ))}
      {Array(halfStars)
        .fill(0)
        .map((_, index) => (
          <FontAwesomeIcon
            key={`half-${index}`}
            icon={faStarHalfAlt}
            className="text-yellow-400"
          />
        ))}
      {Array(emptyStars)
        .fill(0)
        .map((_, index) => (
          <FontAwesomeIcon
            key={`empty-${index}`}
            icon={faStarEmpty}
            className="text-gray-300"
          />
        ))}
    </div>
  );
};

export default StarRating;
