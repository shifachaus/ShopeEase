import { useState } from "react";
import { useForgotPasswordMutation } from "../../utils/userApi";
import { FormButton, FormRow } from "../../component";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [email, setEmail] = useState();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const user = { email };
      const data = await forgotPassword(user);
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
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={handleChange}
          />

          <FormButton isLoading={isLoading} name={"Reset"} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
