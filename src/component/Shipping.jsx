import { Country, State } from "country-state-city";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutStep from "./CheckoutStep";
import { saveShippingInfo } from "../utils/cartSlice";
import { useNavigate } from "react-router-dom";

const Shipping = () => {
  const { shippingInfo } = useSelector((state) => state.cart.shippingInfo);
  // console.log(shippingInfo);
  const disapatch = useDispatch();
  const navigate = useNavigate();

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmint = (e) => {
    e.preventDefault();

    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert("Phone Number should be 10 digits long");
      return;
    }

    disapatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo })
    );

    navigate("/order/confirm");
  };

  return (
    <div className="mx-auto max-w-7xl  p-6 lg:px-8">
      <CheckoutStep activeStep={0} />
      <div className="max-w-md mt-6 mx-auto">
        <h2 className="text-2xl font-medium mb-2 text-center  text-gray-600">
          Shipping Details
        </h2>
        <form onSubmit={(e) => shippingSubmint(e)} className="px-5 pt-6 pb-8">
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Address
            </label>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="address"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="city"
            >
              City
            </label>
            <input
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="city"
              type="text"
              placeholder="City"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="pincode"
            >
              Pin Code
            </label>
            <input
              value={pinCode}
              onChange={(e) => setPinCode(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pincode"
              type="number"
              placeholder=" Pin Code"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="phoneNo"
            >
              Phone Number
            </label>
            <input
              value={phoneNo}
              onChange={(e) => setPhoneNo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="phoneNo"
              type="number"
              placeholder="Phone Number"
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="address"
            >
              Country
            </label>
            <select
              required
              value={country}
              onChange={(e) => setCountry(e.target.value)}
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

          {country && (
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="address"
              >
                State
              </label>
              <select
                required
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">State</option>
                {State &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
          )}

          <div className="flex flex-col">
            <button
              className=" bg-purple-800  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={state ? false : true}
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
