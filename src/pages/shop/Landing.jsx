import { DisplayProduct, Hero, Instagram, Product } from "../../component/Home";

const Landing = () => {
  return (
    <>
      <Hero />
      <Product />
      <div className="bg-gray-100">
        <DisplayProduct />
        <Instagram />
      </div>
    </>
  );
};

export default Landing;
