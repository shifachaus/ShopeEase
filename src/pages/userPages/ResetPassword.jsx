import { useState } from "react";
import { useResetPasswordMutation } from "../../features/users/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { FormButton, FormRow } from "../../component/admin/form/index";
import { toast } from "sonner";

const initialValue = {
  password: "",
  confirmPassword: "",
};
const ResetPassword = () => {
  const { token } = useParams();
  const [values, setValues] = useState(initialValue);

  const navigate = useNavigate();

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = values;

    if (!password || !confirmPassword) {
      return toast.warning("Please fill out all fields");
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match");
    }

    const user = { password, confirmPassword, token };
    try {
      await resetPassword(user).unwrap();
      toast.success("Password reset successfully");
      setValues(initialValue);
      navigate("/login");
    } catch (err) {
      console.error("RESET PASSWORD:", err);
      toast.error(err?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleResetPassword} className="space-y-5">
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            placeholder="New Password"
          />

          <FormRow
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            handleChange={handleChange}
            placeholder="Confirm New Password"
          />

          <FormButton
            isLoading={isLoading}
            name="Reset Password"
            className="w-full py-2 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
