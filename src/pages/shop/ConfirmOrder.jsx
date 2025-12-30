import { CheckoutStep } from "../../component/payment";
import { OrderSummery, ShoppingInfo } from "../../component/order";

const ConfirmOrder = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-10 lg:px-8 mb-12">
      <CheckoutStep activeStep={1} />

      <div className="mt-10  grid md:grid-cols-12 gap-8">
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
