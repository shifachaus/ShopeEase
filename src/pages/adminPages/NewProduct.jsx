import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { useNewProductMutation } from "../../features/products/productApi";
import ProductForm from "../../component/admin/form/ProductForm";

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

const NewProduct = () => {
  const [values, setValues] = useState(initialValue);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const [newProduct, { isLoading }] = useNewProductMutation();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    if (name.startsWith("tags.")) {
      const tagName = name.split(".")[1];

      setValues((prev) => ({
        ...prev,
        tags: {
          ...prev.tags,
          [tagName]: type === "checkbox" ? checked : value,
        },
      }));

      return;
    }

    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const createProductImagesChange = async (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      setImages([]);
      setImagesPreview([]);
      return;
    }

    const imagePromises = files.map(
      (file) =>
        new Promise((resolve, reject) => {
          if (!file.type.startsWith("image/")) {
            reject(new Error(`${file.name} is not a valid image.`));
            return;
          }

          const reader = new FileReader();

          reader.onload = () => resolve(reader.result);
          reader.onerror = () =>
            reject(new Error(`Failed to read ${file.name}.`));

          reader.readAsDataURL(file);
        }),
    );

    try {
      const selectedImages = await Promise.all(imagePromises);

      setImages(selectedImages);
      setImagesPreview(selectedImages);
    } catch (err) {
      toast.error(err.message || "Failed to load product images.");
      setImages([]);
      setImagesPreview([]);
    }
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const { name, description, stock, category, price, originalPrice, tags } =
      values;

    if (
      !name.trim() ||
      !description.trim() ||
      !category.trim() ||
      price === "" ||
      stock === ""
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    const numericPrice = Number(price);
    const numericStock = Number(stock);
    const numericOriginalPrice =
      originalPrice === "" ? undefined : Number(originalPrice);

    if (
      !Number.isFinite(numericPrice) ||
      numericPrice <= 0 ||
      !Number.isInteger(numericStock) ||
      numericStock < 0
    ) {
      toast.error("Please enter a valid price and stock quantity.");
      return;
    }

    if (
      numericOriginalPrice !== undefined &&
      (!Number.isFinite(numericOriginalPrice) ||
        numericOriginalPrice < numericPrice)
    ) {
      toast.error(
        "Original price must be greater than or equal to the selling price.",
      );
      return;
    }

    const product = {
      name: name.trim(),
      description: description.trim(),
      stock: numericStock,
      category: category.trim(),
      price: numericPrice,
      ...(numericOriginalPrice !== undefined && {
        originalPrice: numericOriginalPrice,
      }),
      images,
      tags: {
        ...tags,
        isSale:
          numericOriginalPrice !== undefined &&
          numericOriginalPrice > numericPrice,
      },
    };

    try {
      await newProduct(product).unwrap();

      toast.success("Product created successfully!");
      navigate("/admin/products");
    } catch (err) {
      console.error("Failed to create product:", err);

      toast.error(
        err?.data?.message || "Failed to create product. Please try again.",
      );
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-4 sm:p-6 md:ml-20 lg:ml-64">
      <div className="mx-auto mt-4 max-w-3xl sm:mt-6">
        <header className="mb-6">
          <h1 className="text-center font-heading text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">
            Create Product
          </h1>

          <p className="mt-2 text-center text-sm text-gray-500">
            Add a new product, upload images, and fill in the details.
          </p>
        </header>

        <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 lg:p-8">
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
    </main>
  );
};

export default NewProduct;
