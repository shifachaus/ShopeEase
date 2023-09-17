import { useEffect, useState } from "react";
import { useGetUserQuery, useUpdateUserMutation } from "../utils/userApi";

const UpdateProfile = () => {
  const { data, error, isLoading } = useGetUserQuery();

  const getUserQuery = useGetUserQuery();
  console.log(getUserQuery, "MY ACCOUNT", data);

  const [updateUser] = useUpdateUserMutation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

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

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const user = { name, email, avatar };
    console.log(user, "USER UPDATED");
    try {
      const data = await updateUser(user);
      await getUserQuery.refetch();
      console.log(data);
    } catch (err) {
      console.error("Update Profile error:", err);
    }
  };

  useEffect(() => {
    setName(data?.user?.name);
    setEmail(data?.user?.email);
    setAvatarPreview(data?.user?.avatar?.url);
    setAvatar(data?.user?.avatar?.url);
  }, [data]);

  return (
    <div className="mx-auto max-w-md mt-6 p-6 lg:px-8 h-screen">
      <div className=" bg-white shadow-lg shadow-purple-100 rounded  mb-4 ">
        <h2 className="text-2xl font-medium mb-2 text-center text-gray-600">
          Update Profile
        </h2>
        <form
          onSubmit={(e) => handleUpdateProfile(e)}
          className="px-5 pt-6 pb-8 "
        >
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
          {/* <div className="mb-6 flex flex-col">
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
        </div> */}
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
              className=" bg-[#252323] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
