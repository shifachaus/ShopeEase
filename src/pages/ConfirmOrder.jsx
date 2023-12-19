import CheckoutStep from "../component/CheckoutStep";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/helper";

const ConfirmOrder = () => {
  const { items } = useSelector((state) => state.cart);
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  // const { user } = useSelector((store) => store.user);

  const navigate = useNavigate("");

  const subTotal = items?.reduce((acc, item) => acc + item.qty * item.price, 0);
  const shippingCharges = subTotal > 1000 ? 0 : 200;
  const tax = subTotal * 0.18;
  const totalPrice = subTotal + tax + shippingCharges;

  console.log(shippingInfo, "shippingInfo");

  const address = `${shippingInfo?.address}, ${shippingInfo?.city}, ${shippingInfo?.state}, ${shippingInfo?.pinCode}, ${shippingInfo?.country}`;

  const proceedToPayment = () => {
    const data = { subTotal, shippingCharges, tax, totalPrice };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };

  return (
    <section className="mx-auto max-w-7xl  p-6 lg:px-8 ">
      <CheckoutStep activeStep={1} />

      <main className="mt-10 md:mt-20 mb-10 flex flex-col gap-6 md:grid md:grid-flow-col ">
        <div className="md:col-span-9 relative">
          <div className="mb-10">
            <h2 className="text-xl font-medium mb-2    tracking-tight sm:text-2xl  text-black  ">
              Shipping Info
            </h2>
            <div className="flex flex-col gap-2 p-4 bg-gray-100 md:w-3/4">
              {/* <p className="text-md font-medium">
                Name: <span className="text-sm font-normal">{user?.name}</span>
              </p> */}
              <p className="text-md font-medium">
                Phone:{" "}
                <span className="text-sm font-normal">
                  {shippingInfo?.phoneNo}
                </span>
              </p>
              <p className="text-md font-medium">
                Address: <span className="text-sm font-normal">{address}</span>
              </p>
            </div>
          </div>

          <div className="mb-10 ">
            <h3 className="text-lg font-medium mb-2 tracking-tight sm:text-xl  text-black ">
              Your Cart Items:
            </h3>

            <div className="mt-6 p-2">
              {items?.map((item) => {
                console.log(item.product, "CONFIRM oRDER");
                return (
                  <div
                    key={item._id}
                    className="grid grid-cols-3 gap-2 items-center"
                  >
                    <img
                      src={item?.image}
                      alt={item.name}
                      className="h-16 w-20"
                    />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <p>
                      {item.qty} X {formatPrice(item.price)} ={" "}
                      <b>{formatPrice(item.price * item.qty)}</b>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="md:absolute md:border-r md:border-gray-200 md:w-10 md:h-full md:top-0 md:left-[90%]"></div>
        </div>

        <div className="mt-8 md:col-span-3">
          <h4 className="text-lg font-medium mb-6 tracking-tight sm:text-xl   text-black text-center">
            Order Summery
          </h4>
          <div className="flex flex-col gap-4 p-2 border-t ">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <span>{formatPrice(subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <p>Shipping Charges</p>
              <span>{formatPrice(shippingCharges)}</span>
            </div>
            <div className="flex justify-between">
              <p>GST</p>
              <span>{formatPrice(tax)}</span>
            </div>
            <div className="flex justify-between  border-t border-black">
              <p>Total</p>
              <span>{formatPrice(totalPrice)}</span>
            </div>
            <button
              className="text-white bg-[#252323] mt-4  focus:outline-none  font-medium rounded text-sm px-5 py-2.5 text-center  "
              onClick={proceedToPayment}
            >
              Proceed To Payment
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default ConfirmOrder;
