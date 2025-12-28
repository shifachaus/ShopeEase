const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className=" ">
      <div className="mx-auto max-w-7xl  grid grid-cols-1 space-y-10 bg-primary px-5 py-8 pt-20  tracking-wider text-black md:grid-cols-4 md:space-y-0 xl:px-28 xl:py-20 ">
        <section className="space-y-4 md:mt-12">
          <p className="w-2/3 text-sm font-light text-gray-400">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="capitalize text-gray-400 font-light"> links</h2>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-medium">
            <a href="#">Home</a>
            <a href="#">Shop</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="capitalize text-gray-400 font-light">Help</h2>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-medium">
            <a href="#">Privacy Policies</a>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="capitalize text-gray-400 font-light">Newsletter</h2>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light">
            <div className="flex gap-2 items-center">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="appearance-none border-b border-black w-full py-1 px-1 leading-tight focus:outline-none focus:shadow-outline text-gray-700 "
              />
              <button className="border-b border-black font-medium leading-tight py-1 px-1">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-7xl ">
        <p className=" border-t  p-4 text-sm text-gray-800">
          {year} ShopEase. All rights reverved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
