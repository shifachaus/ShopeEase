import { useState } from "react";
import { useNewProductMutation } from "../../features/products/productApi";
import { useNavigate } from "react-router-dom";
import ProductForm from "../../component/admin/form/ProductForm";

const initialValue = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
};
const NewProduct = () => {
  const [values, setValues] = useState(initialValue);
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
      await newProduct(product);
      navigate("/admin/products");
    } catch (err) {
      console.log(err, "NEW PRODUCT ERROR");
    }
  };

  return (
    <section className=" min-h-screen">
      <div className="p-6 md:ml-20 lg:ml-64">
        <div className="mx-auto max-w-3xl mt-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Create Product
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Add a new product, upload images, and fill in all details.
            </p>
          </div>

          <div className="px-6 py-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default NewProduct;
