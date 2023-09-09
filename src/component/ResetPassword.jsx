import { useState } from "react";
import { useResetPasswordMutation } from "../utils/userApi";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const { token } = useParams();
  //   console.log(token);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetPassword] = useResetPasswordMutation();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const user = { password, confirmPassword, token };
      const data = await resetPassword(user);
      console.log(user, data, "PASSWORD RESET");
    } catch (err) {
      console.log("RESET PASSWORD:", err);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-purple-100 rounded  mb-4">
        <h2 className="text-2xl font-medium mb-2 text-center md:text-left text-gray-600">
          Reset Password
        </h2>
        <form
          onSubmit={(e) => handleResetPassword(e)}
          className="px-5 pt-6 pb-8"
        >
          <div className="mb-6 flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="mb-6 flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>

          <div className="flex flex-col">
            <button
              className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
