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
  const { data: userData, error, isLoading, refetch } = useGetAllUserQuery();
  const [deleteUser] = useDeleteUserMutation();
  const users = userData ? userData?.users : [];

  const deleteUserHandler = async (id) => {
    try {
      const data = await deleteUser(id);
      refetch();
      console.log(data, "DELETE");
    } catch (err) {
      console.log(err);
    }
  };

  const tableColumn = [
    {
      Header: "ID",
      accessor: "_id",
    },
    {
      Header: "Email",
      accessor: "email",
    },
    {
      Header: "Name",
      accessor: "name",
    },

    {
      Header: "Role",
      accessor: "role",
    },

    {
      Header: "ACTION",
      accessor: "Action",
      Cell: ({ row }) => {
        return (
          <div className="flex gap-2">
            <Link to={`/admin/user/${row?.original?._id}`}>
              <FiEdit2 className="text-lg hover:text-[#688272]" />
            </Link>
            <button onClick={() => deleteUserHandler(row?.original?._id)}>
              <AiOutlineDelete className="text-lg hover:text-[#688272]" />
            </button>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => tableColumn, []);

  const { getTableBodyProps, getTableProps, rows, headerGroups, prepareRow } =
    useTable({
      columns: columns,
      data: users,
    });

  return (
    <section>
      <div className="p-4 sm:ml-64 ">
        <div className="mx-auto max-w-7xl p-6 lg:px-8 ">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              ALL USERS
            </h2>
          </div>

          <Table
            getTableBodyProps={getTableBodyProps}
            getTableProps={getTableProps}
            rows={rows}
            headerGroups={headerGroups}
            prepareRow={prepareRow}
          />
        </div>
      </div>
    </section>
  );
};

export default UsersList;
