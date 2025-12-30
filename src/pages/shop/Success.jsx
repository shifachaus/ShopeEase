import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="shadow-xl rounded-xl max-w-md w-full p-8 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="bg-green-100 rounded-full p-3">
            <svg viewBox="0 0 24 24" className="text-green-600 w-12 h-12">
              <path
                fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
              ></path>
            </svg>
          </div>

          <h2 className="text-2xl font-semibold text-gray-900">
            Payment Successful 🎉
          </h2>

          <p className="text-gray-600">
            Thank you for completing your secure payment.
            <br />
            Your order has been placed successfully.
          </p>

          <div className="pt-6 flex flex-col gap-3 w-full">
            <Link
              to="/orders"
              className="w-full bg-gray-900 text-white rounded-lg py-2.5 font-medium hover:bg-black transition"
            >
              View My Orders
            </Link>

            <Link
              to="/"
              className="w-full border border-gray-300 rounded-lg py-2.5 font-medium hover:bg-gray-100 transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
