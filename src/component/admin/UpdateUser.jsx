import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserRoleMutation,
} from "../../utils/userApi";
import { useEffect, useState } from "react";

const UpdateUser = () => {
  const { id } = useParams();
  const { data: userData } = useGetSingleUserQuery(id);
  const [updateUserRole, { isLoading, isError, error }] =
    useUpdateUserRoleMutation();
  const getAllUserQuery = useGetAllUserQuery();

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
        <div className="p-4 sm:ml-64 ">
          <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
            <div className=" p-2 ">
              <h2 className="text-xl font-medium text-[#252323] mb-6 text-center ">
                UPDATE USER
              </h2>
            </div>

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
                  <div className="flex flex-col">
                    <button
                      disabled=""
                      type="submit"
                      className="text-white bg-[#252323]  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded text-sm px-5 py-2.5 text-center "
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
                        <span>Update</span>
                      )}
                    </button>
                  </div>
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
