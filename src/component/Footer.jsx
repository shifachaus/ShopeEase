const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="border-t">
      <p className="p-4 text-center text-md">
        Copyrights {year} &copy; <span className="font-medium">ShopEase</span>
      </p>
    </div>
  );
};

export default Footer;
