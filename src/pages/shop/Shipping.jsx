import { Country, State } from "country-state-city";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CheckoutStep } from "../../component/payment";
import { saveShippingInfo } from "../../features/cart/cartSlice";
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

  const disapatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const shippingSubmint = (e) => {
    e.preventDefault();

    if (values.phoneNo.length < 10 || values.phoneNo.length > 10) {
      alert("Phone Number should be 10 digits long");
      return;
    }

    disapatch(saveShippingInfo(values));

    navigate("/order/confirm");
  };

  useEffect(() => {
    setValues({
      address: shippingInfo?.address,
      city: shippingInfo?.city,
      state: shippingInfo?.state,
      country: shippingInfo?.country,
      pinCode: shippingInfo?.pincode,
      phoneNo: shippingInfo?.phoneNo,
    });
  }, [shippingInfo]);

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8 ">
      <CheckoutStep activeStep={0} />
      <div className="max-w-md mt-10 md:mt-20 mb-10  mx-auto">
        <h2 className="text-xl  mb-2 tracking-tight sm:text-2xl font-medium  text-black text-center ">
          Shipping Details
        </h2>
        <form onSubmit={(e) => shippingSubmint(e)} className="px-5 pt-6 pb-8">
          <FormRow
            type="text"
            name="address"
            value={values.address}
            handleChange={handleChange}
            labelText={"Address"}
          />
          <FormRow
            type="text"
            name="city"
            value={values.city}
            handleChange={handleChange}
            labelText={"City"}
          />
          <FormRow
            type="number"
            name="pincode"
            value={values.pinCode}
            handleChange={handleChange}
            labelText={"Pin Code"}
          />
          <FormRow
            type="number"
            name="phoneNo"
            value={values.phoneNo}
            handleChange={handleChange}
            labelText={"Phone Number"}
          />

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Country
            </label>
            <select
              required
              value={values.country}
              name="country"
              id="country"
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">Country</option>
              {Country &&
                Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
            </select>
          </div>

          {values.country && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                State
              </label>
              <select
                required
                value={values.state}
                name="state"
                id="state"
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(values.country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="flex flex-col mt-8">
            <button
              className="text-white bg-[#252323]  focus:outline-none  font-medium rounded text-sm px-5 py-2.5 text-center  "
              type="submit"
              disabled={values.state ? false : true}
            >
              Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Shipping;
