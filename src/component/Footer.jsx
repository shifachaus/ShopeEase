const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 md:grid-cols-4">
        {/* Address */}
        <section className="space-y-3">
          <h3 className="text-lg font-semibold tracking-tight">ShopEase</h3>
          <p className="text-sm text-gray-500 leading-relaxed">
            400 University Drive Suite 200
            <br />
            Coral Gables, FL 33134 ABC
          </p>
        </section>

        {/* Links */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-500">
            Links
          </h4>

          <nav className="flex flex-col gap-2 text-sm font-medium">
            <a href="#" className="hover:text-gray-900">
              Home
            </a>
            <a href="#" className="hover:text-gray-900">
              Shop
            </a>
            <a href="#" className="hover:text-gray-900">
              About
            </a>
            <a href="#" className="hover:text-gray-900">
              Contact
            </a>
          </nav>
        </section>

        {/* Help */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-500">
            Help
          </h4>

          <nav className="flex flex-col gap-2 text-sm font-medium">
            <a href="#" className="hover:text-gray-900">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-gray-900">
              Terms & Conditions
            </a>
            <a href="#" className="hover:text-gray-900">
              Support
            </a>
          </nav>
        </section>

        {/* Newsletter */}
        <section className="space-y-4">
          <h4 className="text-sm uppercase tracking-wider text-gray-500">
            Newsletter
          </h4>

          <p className="text-sm text-gray-500">
            Subscribe to get updates and offers.
          </p>

          <div className="flex gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="w-full border rounded-sm px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
            />
            <button className="px-4 py-1 text-xs uppercase tracking-widest bg-gray-900 text-white rounded-sm">
              Subscribe
            </button>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="border-t">
        <p className="mx-auto max-w-7xl px-6 py-4 text-sm text-gray-600">
          © {year} ShopEase — All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
