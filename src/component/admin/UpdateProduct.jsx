import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import {
  useGetAdminProductsQuery,
  useGetProductQuery,
  useUpdateProductMutation,
} from "../../utils/productApi";
import { useNavigate, useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const UpdateProduct = () => {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductQuery(id);
  const [updateProduct] = useUpdateProductMutation();
  const getAdminProductsQuery = useGetAdminProductsQuery();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [oldImages, setOldImages] = useState([]);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    setName(product?.product?.name);
    setPrice(product?.product?.price);
    setStock(product?.product?.Stock);
    setCategory(product?.product?.category);
    setDescription(product?.product?.description);
    setOldImages(product?.product?.images);
  }, [product]);

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

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

  const updateProductHandler = async (e) => {
    e.preventDefault();
    const product = { id, name, price, stock, description, images, category };
    console.log(product);
    try {
      const data = await updateProduct(product);
      await getAdminProductsQuery.refetch();
      navigate("/admin/products");
      console.log(data, "UPDATE PRODUCT");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <section>
      <Sidebar />
      <main>
        <div className="p-4 sm:ml-64 bg-stone-50">
          <div className="mx-auto max-w-lg mt-6  p-6 lg:px-8 h-screen">
            <h2 className="text-xl font-medium text-gray-600 mb-6 text-center ">
              UPDATE PRODUCT
            </h2>

            <div className="bg-white shadow-lg rounded">
              <form
                onSubmit={(e) => updateProductHandler(e)}
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
                    <option value={category}>{category}</option>
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
                      onChange={updateProductImagesChange}
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

                  <div className="flex gap-2">
                    {oldImages &&
                      oldImages.map((image, index) => (
                        <img
                          key={index}
                          src={image.url}
                          alt="Old Product Preview"
                          className="h-16 w-16 overflow-x-scroll"
                        />
                      ))}
                  </div>
                </div>

                <div className="flex flex-col mt-6">
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

export default UpdateProduct;
