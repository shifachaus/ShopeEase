const CheckoutStep = ({ activeStep }) => {
  const steps = [
    { label: "Shipping Details" },
    { label: "Confirm Order" },
    { label: "Payment" },
  ];

  return (
    <section>
      <ol className="flex items-center justify-center sm:justify-between p-3 space-x-2 text-sm font-medium text-center text-gray-500 sm:text-base sm:p-4 sm:space-x-4">
        {steps.map((step, i) => {
          return (
            <li
              key={i}
              className={`flex items-center ${
                i <= activeStep && "text-blue-600"
              } `}
            >
              <span
                className={`flex items-center justify-center w-5 h-5 mr-2 text-xs border ${
                  i <= activeStep && "border-blue-600 "
                } rounded-full shrink-0 `}
              >
                {i + 1}
              </span>
              {step.label}
              <span className="hidden sm:inline-flex sm:ml-2">Info</span>
              {i !== 2 && (
                <svg
                  className="w-3 h-3 ml-2 sm:ml-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 12 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m7 9 4-4-4-4M1 9l4-4-4-4"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default CheckoutStep;
