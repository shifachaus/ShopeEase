import { useState } from "react";
import { useEditPasswordMutation, useGetUserQuery } from "../utils/userApi";

const UpdatePassword = () => {
  const [editPassword] = useEditPasswordMutation();
  const getUserQuery = useGetUserQuery();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const user = { oldPassword, newPassword, confirmPassword };
    console.log(user, "USER PASSWORD");
    try {
      const data = await editPassword(user);
      await getUserQuery.refetch();
      console.log(data);
    } catch (err) {
      console.error("Update Password error:", err);
    }
  };

  return (
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-purple-100 rounded  mb-4">
        <h2 className="text-2xl font-medium mb-2 text-center  text-gray-600">
          Reset Password
        </h2>
        <form onSubmit={(e) => handleRegister(e)} className="px-5 pt-6 pb-8">
          <div className="mb-6 flex flex-col">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Old Password
            </label>
            <input
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
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
              New Password
            </label>
            <input
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
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

export default UpdatePassword;
