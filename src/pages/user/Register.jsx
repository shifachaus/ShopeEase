import { useEffect, useState } from "react";
import { login } from "../../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useLoginUserMutation,
  useRegisterUserMutation,
} from "../../utils/userApi";
import { useDispatch } from "react-redux";

const Register = () => {
  const getUserQuery = useGetUserQuery();

  const [switchTabs, setSwitchTabs] = useState("login");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const [loginUser, { isLoading }] = useLoginUserMutation();

  const [registerUser, { isLoading: loading }] = useRegisterUserMutation();

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

    try {
      const data = await registerUser(user);
      console.log(data);
      dispatch(login(data));
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
    <div className="mx-auto max-w-md mt-8  lg:mt-12 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-[#f5f1ed] rounded  mb-4">
        <div className="grid grid-cols-2 mb-4 ">
          <p
            className={`text-center ${
              switchTabs == "login" && "border-b-2 border-[#565E60] "
            } p-2 cursor-pointer`}
            onClick={() => setSwitchTabs("login")}
          >
            Login
          </p>
          <p
            className={`text-center ${
              switchTabs == "register" && "border-b-2 border-[#565E60] "
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
                disabled=""
                type="submit"
                className="text-white bg-[#252323]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center  "
              >
                {isLoading ? (
                  <span>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span>Sign In</span>
                )}
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

            <div className="flex flex-col">
              <button
                disabled=""
                type="submit"
                className="text-white bg-[#252323]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center  "
              >
                {loading ? (
                  <span>
                    <svg
                      aria-hidden="true"
                      role="status"
                      className="inline mr-3 w-4 h-4 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      ></path>
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    Loading...
                  </span>
                ) : (
                  <span>Sign Up</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;