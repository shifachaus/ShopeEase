import { CheckoutStep } from "../../component/payment";
import { OrderSummery, ShoppingInfo } from "../../component/order";

const ConfirmOrder = () => {
  return (
    <section className="mx-auto max-w-6xl px-6 md:px-14 md:pt-6 pb-24">
      <CheckoutStep activeStep={1} />

      <div className="mb-8 mt-10">
        <div className="flex items-center gap-3">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              Review your order
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Check your delivery details and items before payment.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-10  grid md:grid-cols-12 gap-6">
        <div className="md:col-span-8 flex flex-col gap-6">
          <ShoppingInfo />
        </div>

        <div className="md:col-span-4">
          <OrderSummery />
        </div>
      </div>
    </section>
  );
};

export default ConfirmOrder;
