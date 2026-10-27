const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="">
      <div className="bg-gray-950 text-gray-300 max-w-6xl mx-auto md:px-14 px-6 py-16 md:py-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 min-h-[260px]">
        {/* Brand */}
        <section className="space-y-4">
          <div className="flex items-center">
            <h1 className="font-heading text-lg font-bold tracking-tight text-primary md:hidden lg:inline">
              Shop
              <span className="font-body font-semibold text-white">Ease</span>
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            400 University Drive Suite 200
            <br />
            Coral Gables, FL 33134 ABC
          </p>
        </section>

        {/* Links */}
        <section className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-500">
            Links
          </h4>

          <nav className="flex flex-col gap-2 text-sm">
            {["Home", "Shop", "About", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-all duration-200 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </nav>
        </section>

        {/* Help */}
        <section className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-500">
            Help
          </h4>

          <nav className="flex flex-col gap-2 text-sm">
            {["Privacy Policy", "Terms & Conditions", "Support"].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-all duration-200 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </nav>
        </section>

        {/* Newsletter */}
        <section className="space-y-4">
          <h4 className="text-xs uppercase tracking-widest text-gray-500">
            Newsletter
          </h4>

          <p className="text-sm text-gray-400 leading-relaxed">
            Subscribe to get updates and offers.
          </p>

          <form className="flex">
            {" "}
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 h-10 lg:w-24 px-4 text-sm border border-gray-700 bg-gray-800 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary"
            />{" "}
            <button
              type="submit"
              className="h-10 px-4 lg:px-2 text-sm font-medium bg-primary text-white rounded-r-md whitespace-nowrap"
            >
              {" "}
              Subscribe{" "}
            </button>{" "}
          </form>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="">
        <p className="mx-auto max-w-6xl px-6 md:px-14 py-5 text-sm text-gray-500 text-center md:text-left">
          © {year} ShopEase — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
