import { useMemo } from "react";
import { useTable } from "react-table";
import { Link } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";

import {
  useDeleteUserMutation,
  useGetAllUserQuery,
} from "../../features/users/userApi";

import Table from "../../component/ui/Table";

const UsersList = () => {
  const { data: userData, isLoading, isError } = useGetAllUserQuery();

  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();

  const users = userData?.users ?? [];

  const deleteUserHandler = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this user?",
    );

    if (!confirmed) return;

    try {
      await deleteUser(id).unwrap();
    } catch (err) {
      console.error("Failed to delete user:", err);

      window.alert(
        err?.data?.message || "Unable to delete user. Please try again.",
      );
    }
  };

  const columns = useMemo(
    () => [
      {
        Header: "User ID",
        accessor: "_id",
        Cell: ({ value }) => (
          <span className="font-mono text-xs text-gray-500">{value}</span>
        ),
      },
      {
        Header: "Name",
        accessor: "name",
        Cell: ({ value }) => (
          <span className="font-medium text-gray-800">{value || "—"}</span>
        ),
      },
      {
        Header: "Email",
        accessor: "email",
        Cell: ({ value }) => (
          <span className="text-gray-600">{value || "—"}</span>
        ),
      },
      {
        Header: "Role",
        accessor: "role",
        Cell: ({ value }) => {
          const isAdmin = value?.toLowerCase() === "admin";

          return (
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium capitalize ${
                isAdmin
                  ? "bg-purple-100 text-purple-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {value || "User"}
            </span>
          );
        },
      },
      {
        Header: "Actions",
        id: "actions",
        Cell: ({ row }) => (
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/user/${row.original._id}`}
              aria-label={`Edit ${row.original.name || "user"}`}
              title="Edit user"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-orange-50 hover:text-primary"
            >
              <FiEdit2 size={18} />
            </Link>

            <button
              type="button"
              onClick={() => deleteUserHandler(row.original._id)}
              disabled={isDeleting}
              aria-label={`Delete ${row.original.name || "user"}`}
              title="Delete user"
              className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <AiOutlineDelete size={19} />
            </button>
          </div>
        ),
      },
    ],
    [isDeleting],
  );

  const tableData = useMemo(() => users, [users]);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns,
      data: tableData,
    });

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
              All Users
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage registered users and their roles.
            </p>
          </div>

          <span className="text-sm font-medium text-gray-500">
            {users.length} {users.length === 1 ? "user" : "users"}
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          {isLoading ? (
            <div className="p-10 text-center text-sm text-gray-500">
              Loading users...
            </div>
          ) : isError ? (
            <div className="p-10 text-center text-sm text-red-600">
              Failed to load users. Please try again.
            </div>
          ) : users.length === 0 ? (
            <div className="p-10 text-center">
              <p className="font-medium text-gray-800">No users found</p>
              <p className="mt-1 text-sm text-gray-500">
                Registered users will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table
                getTableBodyProps={getTableBodyProps}
                getTableProps={getTableProps}
                rows={rows}
                headerGroups={headerGroups}
                prepareRow={prepareRow}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default UsersList;
