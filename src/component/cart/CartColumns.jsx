const CartColumns = () => {
  return (
    <div className="items-center gap-8  border-b  py-4 px-2 grid-cols-3  grid text-sm tracking-widest mt-10 md:mt-0">
      <p className="text-md  capitalize">Product</p>
      <p className="text-md  capitalize">Quantity</p>
      <p className="text-md  capitalize">Price</p>
    </div>
  );
};

export default CartColumns;
