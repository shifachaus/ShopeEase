import {
  AiOutlineDollar,
  AiOutlineShopping,
  AiOutlineShoppingCart,
  AiOutlineUser,
} from "react-icons/ai";

const Summary = ({ productData, orderData, userData, totalAmount }) => {
  const summaryItems = [
    {
      title: "Total Amount",
      value: (Number(totalAmount || 0) / 100).toLocaleString("en-IN"),
      icon: AiOutlineDollar,
      iconBg: "bg-blue-100",
      iconColor: "#2e2e2e",
    },
    {
      title: "Products",
      value: productData?.products?.length ?? 0,
      icon: AiOutlineShopping,
      iconBg: "bg-green-100",
      iconColor: "#2e2e2e",
    },
    {
      title: "Orders",
      value: orderData?.orders?.length ?? 0,
      icon: AiOutlineShoppingCart,
      iconBg: "bg-purple-100",
      iconColor: "#2e2e2e",
    },
    {
      title: "Users",
      value: userData?.users?.length ?? 0,
      icon: AiOutlineUser,
      iconBg: "bg-yellow-100",
      iconColor: "#2e2e2e",
    },
  ];

  return (
    <div className="">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {summaryItems.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center gap-4 rounded-xl border
                border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className={`shrink-0 rounded-lg p-4 ${item.iconBg}`}>
                <Icon size={22} className={item.iconColor} />
              </div>

              <div className="min-w-0">
                <p
                  className="break-words text-xl
                  tracking-tight text-gray-800 sm:text-2xl"
                >
                  {item.value}
                </p>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Summary;
