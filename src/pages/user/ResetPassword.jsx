import { useState } from "react";
import { useResetPasswordMutation } from "../../features/users/userApi";
import { useNavigate, useParams } from "react-router-dom";
import { FormButton, FormRow } from "../../component/admin/form/index";

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
      alert("Please fill out all fields");
      return;
    }
    const user = { password, confirmPassword, token };

    try {
      const data = await resetPassword(user);
      navigate("/");
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
          <FormRow
            type="password"
            name="password"
            value={values.password}
            handleChange={handleChange}
            labelText={"Password"}
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

export default ResetPassword;
