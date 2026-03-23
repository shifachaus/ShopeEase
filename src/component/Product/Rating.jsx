import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";
import { useState } from "react";

const Rating = ({ stars = 0, setRate }) => {
  const [hover, setHover] = useState(null);

  const displayRating = hover ?? stars;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;

        let icon;

        if (displayRating >= starValue) {
          icon = <BsStarFill size={14} className="fill-yellow-400" />;
        } else if (displayRating >= starValue - 0.5) {
          icon = <BsStarHalf size={14} className="fill-yellow-400" />;
        } else {
          icon = <BsStar size={14} className="fill-yellow-400" />;
        }

        return (
          <span
            key={index}
            role={setRate ? "button" : undefined}
            aria-label={`${starValue} star`}
            className={setRate ? "cursor-pointer" : ""}
            onClick={() => setRate && setRate(starValue)}
            onMouseEnter={() => setRate && setHover(starValue)}
            onMouseLeave={() => setRate && setHover(null)}
          >
            {icon}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
