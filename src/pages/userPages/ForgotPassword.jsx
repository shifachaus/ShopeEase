import { useState } from "react";
import { useForgotPasswordMutation } from "../../features/users/userApi";
import { FormButton, FormRow } from "../../component/admin/form/index";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return toast.warning("Please enter your email");
    }

    try {
      await forgotPassword({ email }).unwrap();
      toast.success("Password reset link sent to your email");
      setEmail("");
    } catch (err) {
      console.error("FORGOT PASSWORD", err);
      toast.error(err?.data?.message || "Failed to send reset email");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-700 text-center mb-6">
          Reset Password
        </h2>
        <form onSubmit={handleForgotPassword} className="space-y-5">
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
            placeholder="Enter your email"
          />
          <FormButton
            isLoading={isLoading}
            name="Send Reset Link"
            className="w-full py-2 mt-2"
          />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
