import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div>
      <h4>404</h4>
      <p>Sorry, we were unable to find that page</p>
      <Link to="/">Sorry, we were unable to find that page</Link>
    </div>
  );
};

export default NotFound;
