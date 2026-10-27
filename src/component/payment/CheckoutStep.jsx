import { HiCheck, HiChevronRight } from "react-icons/hi";

const CheckoutStep = ({ activeStep = 0 }) => {
  const steps = [
    { label: "Shipping Details" },
    { label: "Confirm Order" },
    { label: "Payment" },
  ];

  return (
    <nav aria-label="Checkout progress" className="mx-auto w-full max-w-3xl">
      <ol className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < activeStep;
          const isActive = index === activeStep;
          const isReached = index <= activeStep;

          return (
            <li
              key={step.label}
              className="flex flex-1 items-center last:flex-none"
              aria-current={isActive ? "step" : undefined}
            >
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-3">
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors ${
                    isCompleted
                      ? "border-[#688272] bg-[#688272] text-white"
                      : isActive
                        ? "border-[#688272] bg-white text-[#688272] ring-4 ring-[#688272]/10"
                        : "border-gray-200 bg-white text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <HiCheck size={19} aria-hidden="true" />
                  ) : (
                    index + 1
                  )}
                </div>

                <span
                  className={`whitespace-nowrap text-center text-xs sm:text-sm ${
                    isReached
                      ? "font-semibold text-gray-900"
                      : "font-medium text-gray-400"
                  }`}
                >
                  {step.label}
                </span>
              </div>

              {index !== steps.length - 1 && (
                <div className="mx-2 flex flex-1 items-center sm:mx-4">
                  <div
                    className={`h-px w-full ${
                      isCompleted ? "bg-[#688272]" : "bg-gray-200"
                    }`}
                  />
                  <HiChevronRight
                    className={`-ml-1 hidden shrink-0 sm:block ${
                      isCompleted ? "text-[#688272]" : "text-gray-300"
                    }`}
                    size={16}
                    aria-hidden="true"
                  />
                </div>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default CheckoutStep;
