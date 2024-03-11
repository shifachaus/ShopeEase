import { useEffect, useState } from "react";
import {
  useGetAdminProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../utils/productApi";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../component/ProductForm";

const initialValue = {
  name: "",
  price: "",
  stock: "",
  category: "",
  description: "",
};

const UpdateProduct = () => {
  const [values, setValues] = useState(initialValue);
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const getAdminProductsQuery = useGetAdminProductsQuery();
  const navigate = useNavigate();

  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader?.result]);
          setImages((old) => [...old, reader?.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  const updateProductHandler = async (e) => {
    e.preventDefault();
    const { name, price, stock, description, category } = values; // Remove id from here

    const product = {
      productId: id,
      name,
      price,
      stock,
      description,
      images,
      category,
    };

    try {
      const data = await updateProduct(product);
      await getAdminProductsQuery.refetch();
      navigate("/admin/products");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setValues({
      name: product?.product?.name || "",
      price: product?.product?.price || "",
      stock: product?.product?.Stock || "",
      category: product?.product?.category || "",
      description: product?.product?.description || "",
    });

    setOldImages(product?.product?.images);
  }, [product]);

  return (
    <section>
      <div className="p-4 sm:ml-64 ">
        <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
          <div className=" p-2 ">
            <h2 className="text-xl font-medium mb-6 tracking-tight sm:text-2xl  text-black text-center ">
              UPDATE PRODUCT
            </h2>
          </div>

          <ProductForm
            handlerSubmit={updateProductHandler}
            handleChange={handleChange}
            values={values}
            createProductImagesChange={updateProductImagesChange}
            imagesPreview={imagesPreview}
            isLoading={isLoading}
            oldImages={oldImages}
          />
        </div>
      </div>
    </section>
  );
};

export default UpdateProduct;
