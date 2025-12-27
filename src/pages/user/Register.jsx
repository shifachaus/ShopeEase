import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  FormRow,
  FormButton,
  FormImageRow,
} from "../../component/admin/form/index";
import { login } from "../../features/users/userSlice";
import {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../features/users/userApi";

const initialValue = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const Register = () => {
  const [values, setValues] = useState(initialValue);
  const [switchTabs, setSwitchTabs] = useState("login");
  const [avatarPreview, setAvatarPreview] = useState("");

  const getUserQuery = useGetUserQuery();
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const handleFileUpload = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setValues({ ...values, avatar: reader.result });
          setAvatarPreview(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (!email || !password) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const data = await loginUser(values);
      dispatch(login(data));

      await getUserQuery.refetch();

      if (data?.data?.success) {
        navigate("/");
      }

      if (data?.error?.status == 400) {
        return;
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, avatar } = values;

    if (!email || !password || !avatar || !name) {
      alert("Please fill out all fields");
      return;
    }

    try {
      const data = await registerUser(values);
      dispatch(login(data));

      await getUserQuery.refetch();

      if (data?.data?.success) {
        navigate("/");
      }

      if (data?.error?.status == 400) {
        return;
      }
    } catch (err) {
      console.error("Register error:", err);
    }
  };

  useEffect(() => {
    if (getUserQuery?.status === "fulfilled") {
      navigate("/");
    }
  }, [getUserQuery, navigate, dispatch]);

  return (
    <div className="mx-auto max-w-md mt-8  lg:mt-12 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-[#f5f1ed] rounded  mb-4">
        <div className="grid grid-cols-2 mb-4 ">
          {["login", "register"].map((tab) => (
            <p
              key={tab}
              className={`text-center ${
                switchTabs === tab && "border-b-2 border-[#565E60] "
              } p-2 cursor-pointer`}
              onClick={() => setSwitchTabs(tab)}
            >
              {tab === "login" ? "Login" : "Register"}
            </p>
          ))}
        </div>

        {switchTabs == "login" ? (
          <form onSubmit={(e) => handleLogin(e)} className="px-5 pt-6 pb-8">
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />

            <div className="mb-6 flex flex-col">
              <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
              />

              <Link to="/password/forgot" className="text-sm text-right">
                Forget Password?
              </Link>
            </div>

            <FormButton isLoading={loading} name={"Sign In"} />
          </form>
        ) : (
          <form onSubmit={(e) => handleRegister(e)} className="px-5 pt-6 pb-8">
            <FormRow
              type="text"
              name="name"
              value={values.name}
              handleChange={handleChange}
            />
            <FormRow
              type="email"
              name="email"
              value={values.email}
              handleChange={handleChange}
            />
            <FormRow
              type="password"
              name="password"
              value={values.password}
              handleChange={handleChange}
            />

            <FormImageRow
              handleFileUpload={handleFileUpload}
              avatarPreview={avatarPreview}
            />

            <FormButton isLoading={isLoading} name={"Sign Up"} />
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;
