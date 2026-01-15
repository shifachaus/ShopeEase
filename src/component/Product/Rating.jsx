import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const Rating = ({ stars, setRate }) => {
  return (
    <div className="flex items-center gap-1">
      {Array?.from({ length: 5 }).map((_, index) => {
        const number = index + 0.5;

        return (
          <span key={index}>
            {stars > number ? (
              <BsStarFill
                size={14}
                className="fill-yellow-400"
                onClick={() => setRate && setRate(index + 1)}
                onMouseOver={() => setRate && setRate(index + 1)}
              />
            ) : stars > index ? (
              <BsStarHalf className="fill-yellow-400" size={14} />
            ) : (
              <BsStar
                size={14}
                className="fill-yellow-400"
                onClick={() => setRate && setRate(index + 1)}
                onMouseOver={() => setRate && setRate(index + 1)}
              />
            )}
          </span>
        );
      })}
    </div>
  );
};

export default Rating;
