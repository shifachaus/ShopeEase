import { useEffect, useState } from "react";
import {
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../features/products/productApi";
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from "../../component/admin/form/ProductForm";
import { toast } from "sonner";

const initialValue = {
  name: "",
  price: "",
  originalPrice: "",
  category: "",
  stock: "",
  description: "",
  tags: {
    isFeatured: false,
    isBestSeller: false,
    isSale: false,
  },
};

const UpdateProduct = () => {
  const [values, setValues] = useState(initialValue);
  const { id } = useParams();
  const { data: product } = useGetProductQuery(id);
  const [updateProduct, { isLoading }] = useUpdateProductMutation();
  const navigate = useNavigate();

  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.startsWith("tags.")) {
      const tagName = name.split(".")[1];

      setValues((prev) => ({
        ...prev,
        tags: {
          ...prev.tags,
          [tagName]: checked,
        },
      }));
      return;
    }

    // For normal inputs
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    const { name, price, originalPrice, stock, description, category, tags } =
      values;

    const isSale = originalPrice && Number(originalPrice) > Number(price);

    const product = {
      id,
      name,
      price,
      originalPrice,
      stock,
      description,
      category,
      images,
      tags: {
        ...tags,
        isSale,
      },
    };

    console.log(product);

    try {
      await updateProduct(product).unwrap();
      toast.success("Product updated successfully");
      navigate("/admin/products");
    } catch (err) {
      console.log(err, "Product Update failed");
      toast.error(err?.data?.message || "Product Update failed");
    }
  };

  useEffect(() => {
    if (product?.product) {
      setValues({
        name: product.product.name,
        price: product.product.price,
        originalPrice: product.product.originalPrice || "",
        stock: product.product.Stock,
        category: product.product.category,
        description: product.product.description,
        tags: {
          isFeatured: product.product.tags?.isFeatured || false,
          isBestSeller: product.product.tags?.isBestSeller || false,
          isSale: product.product.tags?.isSale || false,
        },
      });
      setOldImages(product?.product?.images);
    }
  }, [product]);

  return (
    <section className=" min-h-screen">
      <div className="p-6 md:ml-20 lg:ml-64">
        <div className="mx-auto max-w-3xl mt-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 text-center">
              Update Product
            </h2>
            <p className="text-sm text-gray-500 text-center mt-1">
              Modify details, upload new images, or update inventory.
            </p>
          </div>

          <div className="px-6 py-6 lg:px-8">
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
      </div>
    </section>
  );
};

export default UpdateProduct;
