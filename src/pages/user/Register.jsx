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
import { toast } from "sonner";

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

  const { data, isSuccess } = useGetUserQuery();
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
    const file = e.target.files?.[0];
    if (!file) return;

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
    if (!email || !password) return toast.warning("Please fill out all fields");

    try {
      const res = await loginUser(values).unwrap();
      toast.success("Logged in Successfully");
      dispatch(login(res));
      navigate("/");
    } catch (err) {
      console.error("Login error:", err);

      if (err?.status === 401) {
        toast.error("Invalid email or password");
      } else {
        toast.error(err?.data?.message || "Login failed");
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const { name, email, password, avatar } = values;
    if (!name || !email || !password || !avatar) {
      return toast.warning("Please fill out all fields");
    }
    try {
      const res = await registerUser(values).unwrap();
      dispatch(login(res));
      toast.success("Registered Successfully");
      navigate("/");
    } catch (err) {
      console.error("Register error:", err);
      if (err?.status === 401) {
        toast.error("User already exists");
      } else if (err?.status === 500) {
        toast.error(err?.data?.message);
      } else {
        toast.error(err?.data?.message || "Registration failed");
      }
    }
  };

  useEffect(() => {
    if (!isSuccess) return;
    if (isSuccess && data?.user) {
      navigate("/");
    }
  }, [isSuccess, data, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md overflow-hidden">
        {/* Tab Toggle */}
        <div className="flex">
          {["login", "register"].map((tab) => (
            <button
              key={tab}
              onClick={() => setSwitchTabs(tab)}
              className={`flex-1 py-3 text-center font-semibold transition-colors ${
                switchTabs === tab
                  ? "bg-gray-100 text-gray-600 hover:bg-gray-200 "
                  : ""
              }`}
            >
              {tab === "login" ? "Login" : "Register"}
            </button>
          ))}
        </div>

        {/* Form Section */}
        <div className="p-6">
          {switchTabs === "login" ? (
            <form onSubmit={handleLogin} className="space-y-5">
              <FormRow
                type="email"
                name="email"
                value={values.email}
                handleChange={handleChange}
                placeholder="Email"
              />
              <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
                placeholder="Password"
              />

              <div className="text-right text-sm text-indigo-600 hover:underline">
                <Link to="/password/forgot">Forgot Password?</Link>
              </div>

              <FormButton
                isLoading={loading}
                name="Sign In"
                className="w-full py-2 mt-2"
              />
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-5">
              <FormRow
                type="text"
                name="name"
                value={values.name}
                handleChange={handleChange}
                placeholder="Full Name"
              />
              <FormRow
                type="email"
                name="email"
                value={values.email}
                handleChange={handleChange}
                placeholder="Email"
              />
              <FormRow
                type="password"
                name="password"
                value={values.password}
                handleChange={handleChange}
                placeholder="Password"
              />
              <FormImageRow
                handleFileUpload={handleFileUpload}
                avatarPreview={avatarPreview}
              />
              <FormButton
                isLoading={isLoading}
                name="Sign Up"
                className="w-full py-2 mt-2"
              />
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
