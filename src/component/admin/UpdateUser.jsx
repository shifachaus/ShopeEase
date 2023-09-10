import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useUpdateUserRoleMutation,
} from "../../utils/userApi";
import { useEffect, useState } from "react";

const UpdateUser = () => {
  const { id } = useParams();
  const { data: userData, error, isLoading } = useGetSingleUserQuery(id);
  const [updateUserRole] = useUpdateUserRoleMutation();
  const getAllUserQuery = useGetAllUserQuery();

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    setName(userData?.user?.name);
    setEmail(userData?.user?.email);
    setRole(userData?.user?.role);
  }, [userData]);

  const updateUserHandler = async (e) => {
    e.preventDefault();
    const user = { id, name, email, role };
    console.log(user);
    try {
      const data = await updateUserRole(user);
      await getAllUserQuery.refetch();
      // navigate("/admin/users");
      console.log(data, "UPDATE USERS");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
            <h2 className="text-xl font-medium text-gray-600 mb-6 text-center ">
              UPDATE USER
            </h2>

            <div className="bg-white shadow-lg rounded">
              <form
                onSubmit={(e) => updateUserHandler(e)}
                className="px-5 pt-6 pb-8"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="name"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="name"
                    type="text"
                    placeholder="Name"
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

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="role"
                  >
                    Role
                  </label>
                  <select
                    id="role"
                    onChange={(e) => setRole(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value={role}>{role}</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="flex flex-col mt-6">
                  <button
                    className=" bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default UpdateUser;
