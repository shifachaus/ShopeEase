import { useState } from "react";
import {
  useEditPasswordMutation,
  useLazyGetUserQuery,
} from "../../features/users/userApi";
import { FormButton, FormRow } from "../../component/admin/form/index";
import { toast } from "sonner";
import Breadcrumb from "../../component/Breadcrumb";

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
      return toast.warning("Please fill out all fields");
    }

    if (newPassword !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      await editPassword(values).unwrap();
      await getUser().unwrap();
      toast.success("Password updated successfully");
      setValues(initialValue);
    } catch (err) {
      console.error("Update Password error:", err);
      toast.error(err?.data?.message || "Failed to update password");
    }
  };

  return (
    <section>
      <Breadcrumb title={"Update password"} profile={true} />
      <div className="flex items-center flex-col justify-center min-h-screen  px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
            Update Password
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

            <FormButton isLoading={isLoading} name="Update Password" />
          </form>
        </div>
      </div>
    </section>
  );
};

export default UpdatePassword;
