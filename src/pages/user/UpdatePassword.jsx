import { useState } from "react";
import {
  useEditPasswordMutation,
  useLazyGetUserQuery,
} from "../../features/users/userApi";
import { FormButton, FormRow } from "../../component/admin/form/index";

const initialValue = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const UpdatePassword = () => {
  const [values, setValues] = useState(initialValue);

  const [editPassword, { isLoading }] = useEditPasswordMutation();
  const [getUser] = useLazyGetUserQuery();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { oldPassword, newPassword, confirmPassword } = values;

    if (!oldPassword || !newPassword || !confirmPassword) {
      alert("Please fill out all fields");
      return;
    }
    try {
      const data = await editPassword(values);
      await getUser();
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
          <FormRow
            type="password"
            name="oldPassword"
            value={values.oldPassword}
            handleChange={handleChange}
            labelText={"Old Password"}
          />
          <FormRow
            type="password"
            name="newPassword"
            value={values.newPassword}
            handleChange={handleChange}
            labelText={"New Password"}
          />

          <FormRow
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            handleChange={handleChange}
            labelText={"Confirm Password"}
          />

          <FormButton isLoading={isLoading} name={"Reset"} />
        </form>
      </div>
    </div>
  );
};

export default UpdatePassword;
