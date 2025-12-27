import { CheckoutStep } from "../../component/payment";
import { OrderSummery, ShoppingInfo } from "../../component/order";

const ConfirmOrder = () => {
  return (
    <section className="mx-auto max-w-7xl  p-6 lg:px-8 ">
      <CheckoutStep activeStep={1} />

      <div className="mt-10 md:mt-20 mb-10 flex flex-col gap-6 md:grid md:grid-flow-col ">
        <ShoppingInfo />
        <OrderSummery />
      </div>
    </section>
  );
};

export default ConfirmOrder;
