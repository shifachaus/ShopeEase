import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutStep } from "../../component/payment";
import { saveShippingInfo } from "../../features/carts/cartSlice";
import { useNavigate } from "react-router-dom";
import { FormRow } from "../../component/admin/form";

const initialValue = {
  address: "",
  city: "",
  state: "",
  country: "",
  pinCode: "",
  phoneNo: "",
};

const Shipping = () => {
  const [values, setValues] = useState(initialValue);
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (values.phoneNo.length !== 10) {
      alert("Phone Number must be 10 digits");
      return;
    }
    dispatch(saveShippingInfo(values));
    navigate("/order/confirm");
  };

  useEffect(() => {
    if (!shippingInfo) return;
    setValues({
      address: shippingInfo.address || "",
      city: shippingInfo.city || "",
      state: shippingInfo.state || "",
      country: shippingInfo.country || "",
      pinCode: shippingInfo.pinCode || shippingInfo.pincode || "",
      phoneNo: shippingInfo.phoneNo || "",
    });
  }, [shippingInfo]);

  return (
    <div className="mx-auto max-w-6xl  py-10  my-12 px-6 md:px-14 ">
      <CheckoutStep activeStep={0} />

      <div className="mt-12 grid gap-10 md:grid-cols-2">
        {/* Left Info Panel */}
        <div className=" p-6  flex flex-col ">
          <h2 className="text-2xl font-semibold mb-4">Shipping Info</h2>
          <p className="text-gray-600 leading-relaxed">
            Fill out your shipping details carefully. Make sure your address is
            correct to ensure smooth delivery.
          </p>
          <p className="text-gray-500 mt-4 text-sm">
            You will be able to review your order in the next step before
            confirming.
          </p>
        </div>

        {/* Right Form Panel */}
        <form
          onSubmit={shippingSubmit}
          className="bg-white border rounded-2xl shadow-md p-6 flex flex-col gap-4"
        >
          <h2 className="text-xl font-semibold mb-4">Enter Shipping Details</h2>

          <FormRow
            type="text"
            name="address"
            value={values.address}
            handleChange={handleChange}
            labelText="Address"
          />
          <FormRow
            type="text"
            name="city"
            value={values.city}
            handleChange={handleChange}
            labelText="City"
          />
          <FormRow
            type="number"
            name="pinCode"
            value={values.pinCode}
            handleChange={handleChange}
            labelText="Pin Code"
          />
          <FormRow
            type="number"
            name="phoneNo"
            value={values.phoneNo}
            handleChange={handleChange}
            labelText="Phone Number"
          />

          <div>
            <label className="text-gray-700 font-medium text-sm mb-1 block">
              Country
            </label>
            <select
              required
              name="country"
              value={values.country}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
            >
              <option value="">Select Country</option>
              {Country.getAllCountries().map((item) => (
                <option key={item.isoCode} value={item.isoCode}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {values.country && (
            <div>
              <label className="text-gray-700 font-medium text-sm mb-1 block">
                State
              </label>
              <select
                required
                name="state"
                value={values.state}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
              >
                <option value="">Select State</option>
                {State.getStatesOfCountry(values.country).map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={!values.state}
            className="mt-6 py-3 rounded-sm bg-gray-900 text-white font-semibold  disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
