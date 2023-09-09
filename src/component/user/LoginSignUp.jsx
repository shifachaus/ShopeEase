import { useEffect, useState } from "react";
import { login } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../utils/userApi";
import { useDispatch } from "react-redux";

const LoginSignUp = () => {
  const getUserQuery = useGetUserQuery();
  // console.log(getUserQuery, "MY ACCOUNT");

  const [switchTabs, setSwitchTabs] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loginUser, { isLoading, isError, isSuccess, error }] =
    useLoginUserMutation();

  const [registerUser] = useRegisterUserMutation();

  const handleFileUpload = (e) => {
    console.log(e.target.name, e.target.files[0]);
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = { email, password };
      const data = await loginUser(user);
      dispatch(login(data));

      // console.log(data, "DATA LOGIN");
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
    const user = { name, email, password, avatar };
    // console.log(user, "USER REGISTER");
    try {
      const data = await registerUser(user);
      console.log(data);
      navigate("/");
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
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 ">
      <div className=" bg-white shadow-lg shadow-purple-100 rounded  mb-4">
        <div className="grid grid-cols-2 mb-4 ">
          <p
            className={`text-center ${
              switchTabs == "login" && "border-b border-purple-500 "
            } p-2 cursor-pointer`}
            onClick={() => setSwitchTabs("login")}
          >
            Login
          </p>
          <p
            className={`text-center ${
              switchTabs == "register" && "border-b border-purple-500 "
            } p-2 cursor-pointer`}
            onClick={() => setSwitchTabs("register")}
          >
            Register
          </p>
        </div>
        {switchTabs == "login" ? (
          <form onSubmit={(e) => handleLogin(e)} className="px-5 pt-6 pb-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
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
              {/* <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p> */}
              <Link to="/password/forgot" className="text-sm text-right">
                Forget Password?
              </Link>
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
        ) : (
          <form onSubmit={(e) => handleRegister(e)} className="px-5 pt-6 pb-8">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="username"
              >
                username
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="username"
                placeholder="username"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Email"
              />
            </div>
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
            <div className="mb-6 flex items-center gap-2">
              <img
                className="rounded-full w-16 h-16 shadow-sm"
                src={avatarPreview}
                alt="Avatar Preview"
              />

              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center
                 w-full h-10  border-gray-300 
                 shadow appearance-none border
                  rounded-lg cursor-pointer bg-gray-50 
                  "
              >
                <p className="text-sm font-semibold text-gray-600">
                  Click to upload
                </p>

                <input
                  id="dropzone-file"
                  className="hidden"
                  type="file"
                  name="avatar"
                  accept="image/*"
                  onChange={handleFileUpload}
                />
              </label>
            </div>

            {/* <div class="flex items-center justify-center w-full"> */}

            {/* </div> */}

            <div className="flex flex-col">
              <button
                className=" bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign In
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignUp;
