import { useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetAdminProductsQuery,
  useNewProductMutation,
} from "../../utils/productApi";
import { useNavigate } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const NewProduct = () => {
  const getAdminProductsQuery = useGetAdminProductsQuery();
  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

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
    try {
      const product = { name, description, stock, category, images, price };

      const data = await newProduct(product);
      await getAdminProductsQuery.refetch();
      navigate("/admin/products");
      console.log(data, "SUCCESS");
    } catch (err) {
      console.log(err, "NEW PRODUCT ERROR");
    }
  };

  return (
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
            <h2 className="text-xl font-medium text-gray-600 mb-6 text-center ">
              CREATE PRODUCT
            </h2>

            <div className="bg-white shadow-lg rounded">
              <form
                onSubmit={(e) => createProduct(e)}
                className="px-5 pt-6 pb-8"
              >
                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productname"
                  >
                    Product Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="productname"
                    type="text"
                    placeholder="Product Name"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="price"
                  >
                    Price
                  </label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="price"
                    type="number"
                    placeholder="Price"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="category"
                  >
                    Category
                  </label>
                  <select
                    id="category"
                    onChange={(e) => setCategory(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 ">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="productdescription"
                  >
                    Product Description
                  </label>
                  <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="productdescription"
                    type="text"
                    placeholder="Product Description"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor="Stock"
                  >
                    Stock
                  </label>
                  <input
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="Stock"
                    type="number"
                    placeholder="Stock"
                  />
                </div>

                <div className="mb-8 flex flex-col gap-2  items-center ">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center
                 w-full h-10  border-gray-300 
                 shadow appearance-none border
                  rounded-lg cursor-pointer bg-gray-50 
                  "
                  >
                    <p className="text-sm font-semibold text-gray-600">
                      Click to upload
                    </p>

                    <input
                      id="dropzone-file"
                      className="hidden"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={createProductImagesChange}
                      multiple
                    />
                  </label>

                  <div className="flex gap-2">
                    {imagesPreview?.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Product Preview"
                        className="h-16 w-16 overflow-x-scroll"
                      />
                    ))}
                  </div>
                </div>

                <div className="flex flex-col">
                  <button
                    className=" bg-purple-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="submit"
                  >
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default NewProduct;
