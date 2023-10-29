const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="  bg-gray-100  ">
      <div className="mx-auto max-w-7xl  grid grid-cols-1 space-y-10 bg-primary px-5 py-8 pt-20  tracking-wider text-black md:grid-cols-4 md:space-y-0 xl:px-28 xl:py-20 ">
        <section className="space-y-4">
          <p className="w-2/3 text-sm font-light">
            400 University Drive Suite 200 Coral Gables, FL 33134 USA
          </p>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="uppercase ">Userful links</h2>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light">
            <a href="#" className="hover:text-white/80">
              Home
            </a>
            <a href="#" className="hover:text-white/80">
              Shop
            </a>
            <a href="#" className="hover:text-white/80">
              About
            </a>
            <a href="#" className="hover:text-white/80">
              Contact
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="uppercase ">Help</h2>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light">
            <a href="#" className="hover:text-white/80">
              Privacy Policies
            </a>
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-1">
            <h2 className="uppercase ">Newsletter</h2>
            <div className="w-1/6 border-t"></div>
          </div>
          <div className="flex flex-col space-y-4 text-sm font-light">
            <div className="flex gap-2 items-center">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className="appearance-none bg-gray-100 border-b border-black w-full py-1 px-1 leading-tight focus:outline-none focus:shadow-outline text-gray-700 "
              />
              <button className="bg-gray-100 border-b border-black font-medium leading-tight py-1 px-1">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </section>
      </div>

      <div className="mx-auto max-w-7xl ">
        <p className=" border-t  p-4 text-black">
          {year} ShopEase. All rights reverved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
