import { useState } from "react";
import { useForgotPasswordMutation } from "../utils/userApi";

const ForgotPassword = () => {
  const [forgotPassword] = useForgotPasswordMutation();
  const [email, setEmail] = useState();

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const user = { email };
      const data = await forgotPassword(user);
      console.log(data);
    } catch (err) {
      console.log("FORGOT PASSWORD", err);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-purple-100 rounded  mb-4">
        <h2 className="text-2xl font-medium mb-2 text-center md:text-left text-gray-600">
          Reset Password
        </h2>
        <form
          onSubmit={(e) => handleForgotPassword(e)}
          className="px-5 pt-6 pb-8"
        >
          <div className="mb-6 flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>

          <div className="flex flex-col">
            <button
              className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
