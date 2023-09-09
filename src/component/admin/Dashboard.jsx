import { useRef } from "react";
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
  let outOfStock = 0;

  productData?.products &&
    productData?.products.forEach((item) => {
      if (item?.Stock === 0) {
        outOfStock += 1;
      }
    });

  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, 4000],
        backgroundColor: "white",
        borderColor: "purple",
        borderWidth: 1,
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
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, productData?.products?.length - outOfStock],
      },
    ],
  };

  return (
    <section>
      <Sidebar />

      <main>
        <div className="p-4 sm:ml-64">
          <div className="flex items-center p-2 text-gray-900 rounded-lg  group">
            <svg
              className="w-5 h-5 text-gray-500 transition duration-75  group-hover:text-gray-900 "
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 22 21"
            >
              <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
              <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
            </svg>
            <p className="ml-3 text-xl font-medium text-gray-600">Dashboard</p>
          </div>

          <div className="p-4 flex flex-col  gap-4 ">
            <div className=" flex flex-col items-center justify-center h-24 rounded bg-purple-800 mb-4 text-white">
              <p>Total Amount</p>
              <p>2000</p>
            </div>

            <div className="md:grid md:grid-cols-3 gap-4 self-center flex flex-wrap items-center justify-center">
              <div className=" flex flex-col items-center justify-center h-40 w-40 rounded-full bg-orange-300 mb-4 text-white">
                <p>Product</p>
                <p>{productData?.products?.length}</p>
              </div>
              <div className=" flex flex-col items-center justify-center h-40 w-40 rounded-full bg-green-400 mb-4 text-white">
                <p>Orders</p>
                <p>4</p>
              </div>
              <div className=" flex flex-col items-center justify-center h-40 w-40 rounded-full bg-black mb-4 text-white">
                <p>Users</p>
                <p>2</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:ml-64 ">
          <Line data={data} options={options} />
        </div>
        <div className="bg-white p-4 sm:ml-64 ">
          <Doughnut data={doughnutState} />
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
