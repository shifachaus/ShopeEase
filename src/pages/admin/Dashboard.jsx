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
import Summary from "../../component/Summary";

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
  const { data: productData } = useGetAdminProductsQuery();
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

  const data = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        data: [0, totalAmount / 100],
        backgroundColor: "#688272",
        borderColor: "black",
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
        backgroundColor: ["#DFEEDB", "#A6D997"],

        data: [outOfStock, productData?.products?.length - outOfStock],
      },
    ],
  };

  return (
    <main className="p-6 sm:ml-64 ">
      <div className=" p-2 ">
        <h2 className="ml-3 text-xl md:text-2xl font-medium text-[#252323]  mb-6 tracking-tight  ">
          Dashboard
        </h2>
      </div>

      <div className="flex flex-col gap-8">
        <Summary
          productData={productData}
          userData={userData}
          orderData={orderData}
          totalAmount={totalAmount}
        />

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
  );
};

export default Dashboard;
