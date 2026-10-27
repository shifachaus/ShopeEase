import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiPhone } from "react-icons/fi";

import { CheckoutStep } from "../../component/payment";
import { saveShippingInfo } from "../../features/carts/cartSlice";
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
  const [error, setError] = useState("");

  const shippingInfo = useSelector((store) => store.cart.shippingInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!shippingInfo) return;

    setValues({
      address: shippingInfo.address || "",
      city: shippingInfo.city || "",
      state: shippingInfo.state || "",
      country: shippingInfo.country || "",
      pinCode: String(shippingInfo.pinCode || shippingInfo.pincode || ""),
      phoneNo: String(shippingInfo.phoneNo || ""),
    });
  }, [shippingInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");

    if (name === "country") {
      setValues((prev) => ({
        ...prev,
        country: value,
        state: "",
      }));
      return;
    }

    if (name === "phoneNo") {
      setValues((prev) => ({
        ...prev,
        phoneNo: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    if (name === "pinCode") {
      setValues((prev) => ({
        ...prev,
        pinCode: value.replace(/\D/g, "").slice(0, 10),
      }));
      return;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const isFormValid = Boolean(
    values.address.trim() &&
    values.city.trim() &&
    values.country &&
    values.state &&
    values.pinCode.trim() &&
    values.phoneNo.length === 10,
  );

  const shippingSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      setError("Please complete all fields before continuing.");
      return;
    }

    dispatch(saveShippingInfo(values));
    navigate("/order/confirm");
  };

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition hover:border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10";

  const labelClass = "mb-2 block text-sm font-medium text-gray-700";

  return (
    <section className="mx-auto mb-12 max-w-2xl px-4 py-8 sm:px-6">
      <CheckoutStep activeStep={0} />

      <form
        onSubmit={shippingSubmit}
        className="mt-8 rounded-2xl border border-gray-100 bg-white p-5 sm:p-8"
      >
        {/* Form heading */}
        <div className="mb-7 border-b border-gray-100 pb-5">
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Shipping Information
          </h1>
        </div>

        <div className="space-y-5">
          {/* Address */}
          <FormRow
            type="text"
            name="address"
            value={values.address}
            handleChange={handleChange}
            labelText="Street address *"
            placeholder="House number and street"
            required
          />

          {/* City and PIN */}
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <FormRow
              type="text"
              name="city"
              value={values.city}
              handleChange={handleChange}
              labelText="City *"
              placeholder="Enter your city"
              required
            />

            <FormRow
              type="text"
              name="pinCode"
              value={values.pinCode}
              handleChange={handleChange}
              labelText="PIN / Postal code *"
              placeholder="Enter postal code"
              required
            />
          </div>

          {/* Country */}
          <div>
            <label className={labelClass} htmlFor="country">
              Country *
            </label>

            <select
              id="country"
              required
              name="country"
              value={values.country}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Select your country</option>
              {Country.getAllCountries().map((country) => (
                <option key={country.isoCode} value={country.isoCode}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          {values.country && (
            <div>
              <label className={labelClass} htmlFor="state">
                State / Region *
              </label>

              <select
                id="state"
                required
                name="state"
                value={values.state}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="">Select your state</option>
                {State.getStatesOfCountry(values.country).map((state) => (
                  <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Phone */}
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FiPhone size={15} className="text-gray-500" />
              <span className="text-sm font-medium text-gray-700">
                Contact number
              </span>
            </div>

            <FormRow
              type="tel"
              name="phoneNo"
              value={values.phoneNo}
              handleChange={handleChange}
              labelText="Phone number *"
              placeholder="Enter your 10-digit number"
              required
            />

            <p className="-mt-2 mb-4 text-xs text-gray-500">
              Enter 10 digits without the country code.
            </p>
          </div>
        </div>

        {/* Validation message */}
        {error && (
          <p
            role="alert"
            className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600"
          >
            {error}
          </p>
        )}

        {/* Continue button */}
        <button
          type="submit"
          disabled={!isFormValid}
          className="mt-7 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500"
        >
          Continue to order review
          <FiArrowRight size={17} />
        </button>
      </form>
    </section>
  );
};

export default Shipping;
