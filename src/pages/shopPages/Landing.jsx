import {
  Hero,
  BrandBanner,
  Product,
  Categories,
  StoreBenefits,
  DealOfTheWeek,
} from "../../component/Home";

const Landing = () => {
  return (
    <>
      <Hero />
      <Categories />
      <StoreBenefits />
      <Product />
      <DealOfTheWeek />
      <BrandBanner />
    </>
  );
};

export default Landing;
