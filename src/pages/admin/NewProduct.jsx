import { useState } from "react";
import {
  useGetAdminProductsQuery,
  useNewProductMutation,
} from "../../utils/productApi";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../component/ProductForm";

const initialValue = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
};
const NewProduct = () => {
  const [values, setValues] = useState(initialValue);

  const getAdminProductsQuery = useGetAdminProductsQuery();
  const [newProduct, { isLoading }] = useNewProductMutation();
  const navigate = useNavigate();

  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    const { name, description, stock, category, price } = values;
    const product = { name, description, stock, category, price, images };
    try {
      const data = await newProduct(product);
      await getAdminProductsQuery.refetch();

      navigate("/admin/products");
    } catch (err) {
      console.log(err, "NEW PRODUCT ERROR");
    }
  };

  return (
    <section>
      <div className="p-4 sm:ml-64">
        <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              CREATE PRODUCT
            </h2>
          </div>
          <ProductForm
            handlerSubmit={createProduct}
            handleChange={handleChange}
            values={values}
            createProductImagesChange={createProductImagesChange}
            imagesPreview={imagesPreview}
            isLoading={isLoading}
          />
        </div>
      </div>
    </section>
  );
};

export default NewProduct;
