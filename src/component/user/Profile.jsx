import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../utils/userApi";

const Profile = () => {
  const { data } = useGetUserQuery();
  console.log(data, "MY PROFILE");

  return (
    <div className="mx-auto max-w-6xl mt-6 p-6 lg:px-8 h-full md:h-screen">
      <h2 className="text-2xl font-medium mb-6 text-center md:text-left text-gray-600">
        My Profile
      </h2>
      <div className="flex flex-col items-center gap-8 md:grid md:grid-cols-2 md:gap-4">
        <div className="flex flex-col justify-center gap-4 md:items-center">
          <img
            className="bg-gray-200 w-40 h-40 rounded-full mb-3 md:w-56 md:h-56 "
            src={data?.user?.avatar?.url}
            alt={data?.user?.name}
          />
          <Link
            className="flex justify-center border border-purple-800 rounded-md px-2 py-1 md:w-40"
            to="/me/update"
          >
            Edit Profile
          </Link>
        </div>

        <div>
          <div className="mt-10 flex flex-col items-center gap-6 md:items-start">
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="text-xl">Full Name</h4>
              <p className="text-md text-gray-600">{data?.user?.name}</p>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="text-xl">Email</h4>
              <p className="text-md text-gray-600">{data?.user?.email}</p>
            </div>
            <div className="flex flex-col items-center gap-2 md:items-start">
              <h4 className="text-xl">Joined on</h4>
              <p className="text-md text-gray-600">
                {String(data?.user?.createdAt).substr(0, 10)}
              </p>
            </div>
          </div>

          <div className="flex flex-col w-60 md:w-80 gap-2 mt-10">
            <Link
              className="flex justify-center bg-purple-800 p-2 px-4 cursor-pointer rounded text-white border border-purple-800 hover:shadow-md "
              to="/orders"
            >
              My Orders
            </Link>
            <Link
              className="flex justify-center bg-purple-800 p-2 px-4 cursor-pointer rounded text-white border border-purple-800 hover:shadow-md "
              to="/password/update"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
