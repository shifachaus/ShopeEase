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

import { useGetAdminProductsQuery } from "../../features/products/productApi";
import { useAllOrdersQuery } from "../../features/orders/orderApi";
import { useGetAllUserQuery } from "../../features/users/userApi";
import Summary from "../../component/ui/Summary";

Chartjs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
);

const Dashboard = () => {
  const { data: productData, isLoading: productsLoading } =
    useGetAdminProductsQuery();

  const { data: orderData, isLoading: ordersLoading } = useAllOrdersQuery();

  const { data: userData } = useGetAllUserQuery();

  const products = productData?.products ?? [];
  const orders = orderData?.orders ?? [];

  const outOfStock = products.filter(
    (product) => Number(product?.Stock) === 0,
  ).length;

  const inStock = products.length - outOfStock;

  const totalAmount = orders.reduce(
    (total, order) => total + (Number(order?.totalPrice) || 0),
    0,
  );

  const lineData = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "Total Revenue",
        data: [0, totalAmount / 100],
        backgroundColor: "rgba(223, 109, 79, 0.15)",
        borderColor: "#DF6D4F",
        borderWidth: 2,
        pointBackgroundColor: "#DF6D4F",
        pointRadius: 4,
        pointHoverRadius: 6,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value) => `₹${Number(value).toLocaleString("en-IN")}`,
        },
      },
    },
  };

  const doughnutData = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        data: [outOfStock, inStock],
        backgroundColor: ["#DF6D4F", "#16A34A"],
        hoverBackgroundColor: ["#C95438", "#15803D"],
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%",
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
        Dashboard
      </h1>

      <div className="flex flex-col gap-6">
        <Summary
          productData={productData}
          userData={userData}
          orderData={orderData}
          totalAmount={totalAmount}
        />

        {productsLoading || ordersLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
            Loading dashboard charts...
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
            <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 xl:col-span-2">
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Revenue Overview
              </h2>

              <div className="relative h-72 sm:h-80">
                <Line data={lineData} options={lineOptions} />
              </div>
            </section>

            <section className="min-w-0 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="mb-5 text-lg font-semibold text-gray-800">
                Inventory Overview
              </h2>

              {products.length > 0 ? (
                <div className="relative mx-auto h-72 max-w-sm sm:h-80">
                  <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
              ) : (
                <div className="flex h-72 items-center justify-center text-sm text-gray-500">
                  No products available.
                </div>
              )}
            </section>
          </div>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
