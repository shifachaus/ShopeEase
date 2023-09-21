import Sidebar from "./Sidebar";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart as Chartjs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useGetAdminProductsQuery } from "../../utils/productApi";
import { useAllOrdersQuery } from "../../utils/orderApi";
import { useGetAllUserQuery } from "../../utils/userApi";

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { data: productData, error, isLoading } = useGetAdminProductsQuery();
  const { data: orderData } = useAllOrdersQuery();
  const { data: userData } = useGetAllUserQuery();

  let outOfStock = 0;

  productData?.products &&
    productData?.products.forEach((item) => {
      if (item?.Stock === 0) {
        outOfStock += 1;
      }
    });

  let totalAmount = 0;
  orderData?.orders &&
    orderData?.orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  // console.log(orderData?.orders, totalAmount, "DASH");

  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, totalAmount / 100],
        backgroundColor: "#7166F9",
        borderColor: "#9B75FC",
        borderWidth: 2,
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      y: {},
    },
  };

  const doughnutState = {
    labels: ["Out of Stock", "InStock"],
    datasets: [
      {
        backgroundColor: ["#DFEEDB", "#A6D997"],

        data: [outOfStock, productData?.products?.length - outOfStock],
      },
    ],
  };

  return (
    <section>
      <Sidebar />

      <main className="p-6 sm:ml-64 ">
        <div className=" p-2 ">
          <h2 className="ml-3 text-xl md:text-2xl font-medium text-[#252323]  mb-6 tracking-tight  ">
            Dashboard
          </h2>
        </div>

        <div className="flex flex-col gap-8">
          <div className="p-4  ">
            <div className="sm:grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6  flex flex-col">
              <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
                <span className="text-sm font-bold bg-blue-200 rounded  px-2 py-1  ">
                  Total Amount
                </span>
                <p className="text-2xl md:text-3xl  mt-4">
                  {totalAmount / 100}
                </p>
              </div>

              <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
                <span className="text-sm font-bold bg-green-200 rounded  px-2 py-1 ">
                  Product
                </span>
                <p className="text-2xl md:text-3xl  mt-4">
                  {productData?.products?.length}
                </p>
              </div>
              <div className=" bg-white mb-4 text-black p-4 shadow-md rounded">
                <span className="text-sm font-bold bg-purple-200 rounded  px-2 py-1">
                  Orders
                </span>
                <p className="text-2xl md:text-3xl  mt-4">
                  {orderData?.orders?.length}
                </p>
              </div>
              <div className="  bg-white mb-4 text-black p-4 shadow-md rounded">
                <span className="text-sm font-bold bg-yellow-100 rounded  px-2 py-1 ">
                  Users
                </span>
                <p className="text-2xl md:text-3xl  mt-4">
                  {userData?.users?.length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4  flex flex-col  gap-6 md:grid md:grid-flow-col  ">
            <div className=" text-black p-4 shadow-md rounded-lg col-span-10">
              <Line data={data} options={options} />
            </div>
            <div className="flex flex-col justify-center col-span-2 p-2  shadow-md rounded-lg">
              <Doughnut data={doughnutState} />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
