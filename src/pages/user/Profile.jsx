import { Link } from "react-router-dom";
import { useGetUserQuery } from "../../features/users/userApi";
import {
  FiUser,
  FiMail,
  FiCalendar,
  FiShoppingBag,
  FiEdit3,
} from "react-icons/fi";

const Profile = () => {
  const { data } = useGetUserQuery();
  const user = data?.user;

  return (
    <div className="max-w-6xl mx-auto my-20 px-6 ">
      <div className="flex flex-col md:flex-row  gap-6">
        <img
          src={user?.avatar?.url || "/placeholder-avatar.png"}
          className="w-28 h-28 rounded-2xl object-cover shadow"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold tracking-tight">
            {user?.name}
          </h2>
          <p className="text-gray-500">{user?.email}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              to="/me/update"
              className="px-4 py-2 rounded-lg border flex items-center gap-2 hover:bg-gray-100"
            >
              <FiEdit3 /> Edit Profile
            </Link>

            <Link
              to="/password/update"
              className="px-4 py-2 rounded-lg border flex items-center gap-2 hover:bg-gray-100"
            >
              Change Password
            </Link>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mt-10">
        <div className="p-6 border rounded-xl bg-white shadow-sm flex gap-3">
          <FiUser className="text-xl text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Full Name</p>
            <p className="text-lg font-medium">{user?.name}</p>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm flex gap-3">
          <FiMail className="text-xl text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="text-lg font-medium">{user?.email}</p>
          </div>
        </div>

        <div className="p-6 border rounded-xl bg-white shadow-sm flex gap-3">
          <FiCalendar className="text-xl text-gray-500" />
          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="text-lg font-medium">
              {String(user?.createdAt).substring(0, 10)}
            </p>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="grid md:grid-cols-2 gap-4 mt-10">
        <Link
          to="/orders"
          className="px-4 py-3 rounded-xl bg-gray-900 text-white flex justify-center items-center gap-2 hover:bg-gray-700"
        >
          <FiShoppingBag /> My Orders
        </Link>

        <Link
          to="/"
          className="px-4 py-3 rounded-xl border text-center hover:bg-gray-100"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Profile;
