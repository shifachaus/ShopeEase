import { Link } from "react-router-dom";
import {
  FiCheckCircle,
  FiPackage,
  FiArrowRight,
  FiShoppingBag,
} from "react-icons/fi";

const Success = () => {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg rounded-2xl border border-gray-100 bg-white p-6 text-center shadow-sm sm:p-10">
        {/* Success icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <FiCheckCircle
            size={52}
            className="text-green-600"
            strokeWidth={1.6}
          />
        </div>

        {/* Heading */}
        <div className="mt-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-green-600">
            Payment complete
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Thank you for your order!
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
            Your payment was successful. We're looking forward to getting your
            order ready.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            to="/orders"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            <FiShoppingBag size={18} />
            View My Orders
            <FiArrowRight size={17} />
          </Link>

          <Link
            to="/"
            className="inline-flex min-h-12 w-full items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:border-gray-300 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Success;
