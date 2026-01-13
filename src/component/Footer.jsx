const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-6xl   border-t">
      <div className="mx-auto max-w-6xl px-6 md:px-14 py-14 grid gap-10 md:grid-cols-4 bg-gray-900 text-gray-300">
        {/* Address */}
        <section className="space-y-4">
          <h1 className="font-black tracking-wider text-xl ">
            <span className="text-primary">Shop</span>
            <span className="text-white">Ease</span>
          </h1>

          <p className="text-sm text-gray-300">
            400 University Drive Suite 200
            <br />
            Coral Gables, FL 33134 ABC
          </p>
        </section>

        {/* Links */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-300">
            Links
          </h4>

          <nav className="flex flex-col gap-2 text-sm font-medium">
            <a href="#" className="hover:text-gray-300 ">
              Home
            </a>
            <a href="#" className="hover:text-gray-300">
              Shop
            </a>
            <a href="#" className="hover:text-gray-300">
              About
            </a>
            <a href="#" className="hover:text-gray-300">
              Contact
            </a>
          </nav>
        </section>

        {/* Help */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-300">
            Help
          </h4>

          <nav className="flex flex-col gap-2 text-sm font-medium">
            <a href="#" className="hover:text-gray-400">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-400">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-gray-400">
              Support
            </a>
          </nav>
        </section>

        {/* Newsletter */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-30">
            Newsletter
          </h4>

          <p className="text-sm text-gray-400">
            Subscribe to get updates and offers.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="px-4 py-1 text-xs uppercase tracking-widest bg-primary text-white rounded-sm">
              Subscribe
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div>
        <p className="mx-auto max-w-6xl px-6 md:px-14 py-4 text-sm text-gray-700">
          © {year} ShopEase — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
