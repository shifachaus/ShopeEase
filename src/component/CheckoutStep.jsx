import { HiChevronDoubleRight } from "react-icons/hi";
const CheckoutStep = ({ activeStep }) => {
  const steps = [
    { label: "Shipping Details" },
    { label: "Confirm Order" },
    { label: "Payment" },
  ];

  return (
    <section>
      <ol className="flex items-center justify-center sm:justify-between p-3 space-x-2 text-sm font-medium text-center text-gray-900 sm:text-base sm:p-4 sm:space-x-4">
        {steps.map((step, i) => {
          return (
            <li
              key={i}
              className={`flex items-center ${
                i <= activeStep && "text-[#688272]"
              } `}
            >
              {step.label}

              {i !== 2 && (
                <HiChevronDoubleRight className="w-4 h-4 ml-2 sm:ml-4" />
              )}
            </li>
          );
        })}
      </ol>
    </section>
  );
};

export default CheckoutStep;
