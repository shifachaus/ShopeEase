const CartColumns = () => {
  return (
    <div className="hidden items-center gap-8  border-b  py-4 px-2 grid-cols-3  md:grid text-sm tracking-widest mt-10    text-gray-500 uppercase">
      <p className="text-md  uppercase">PRODUCT DETAILS</p>
      <p className="text-md  uppercase">Quantity</p>
      <p className="text-md  uppercase">Price</p>
    </div>
  );
};

export default CartColumns;
