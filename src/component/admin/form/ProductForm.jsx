import FormButton from "./FormButton";
import FormRow from "./FormRow";

const categories = ["Tables and Chairs", "Sofas", "Lighting", "Decor"];

const ProductForm = ({
  handlerSubmit,
  handleChange,
  values,
  createProductImagesChange,
  imagesPreview,
  isLoading,
  oldImages,
}) => {
  return (
    <div className="bg-white shadow-sm rounded-2xl border border-gray-100">
      <form onSubmit={handlerSubmit} className="px-6 pt-8 pb-10 space-y-6">
        <h3 className="text-lg font-semibold text-gray-800 text-center">
          Product Details
        </h3>

        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          labelText="Product Name"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <FormRow
            type="number"
            name="price"
            value={values.price}
            handleChange={handleChange}
            labelText="Product Price"
          />

          <FormRow
            type="number"
            name="originalPrice"
            value={values?.originalPrice}
            handleChange={handleChange}
            labelText="Product Original Price"
          />

          <div className="mb-2">
            <label
              htmlFor="category"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Category
            </label>

            <select
              id="category"
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full rounded-lg border-gray-300 text-gray-700 shadow-sm focus:ring-2 focus:ring-gray-800 focus:border-gray-800 py-2 px-3"
            >
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <FormRow
            type="number"
            name="stock"
            value={values.stock}
            handleChange={handleChange}
            labelText="Stock Quantity"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-2">
          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="tags.isFeatured"
              checked={values?.tags?.isFeatured}
              onChange={handleChange}
              className="accent-black"
            />
            Featured
          </label>

          <label className="flex items-center gap-2 text-sm font-medium">
            <input
              type="checkbox"
              name="tags.isBestSeller"
              checked={values?.tags?.isBestSeller}
              onChange={handleChange}
              className="accent-black"
            />
            Best Seller
          </label>

          <label className="flex items-center gap-2 text-sm font-medium opacity-70">
            <input
              type="checkbox"
              checked={
                values?.originalPrice &&
                Number(values?.originalPrice) > Number(values.price)
              }
              disabled
              className="accent-black"
            />
            On Sale (auto)
          </label>
        </div>

        <FormRow
          type="text"
          name="description"
          value={values.description}
          handleChange={handleChange}
          labelText="Product Description"
        />

        {/* Upload Section */}
        <div className="bg-gray-50 border border-dashed rounded-xl p-5">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <p className="text-sm font-semibold text-gray-700">
              Upload Product Images
            </p>
            <p className="text-xs text-gray-500">
              Click to upload — you can select multiple files
            </p>

            <div className="mt-3 w-full h-11 flex items-center justify-center rounded-lg border border-gray-300 bg-white hover:bg-gray-100 transition">
              <span className="text-sm text-gray-700 font-medium">
                Choose Files
              </span>
            </div>

            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </label>

          {/* New Images */}
          {imagesPreview?.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-3">
              {imagesPreview.map((image, i) => (
                <img
                  key={i}
                  src={image}
                  alt="Preview"
                  className="h-16 w-16 rounded-lg object-cover border"
                />
              ))}
            </div>
          )}

          {/* Old Images */}
          {oldImages?.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-3">
              {oldImages.map((image, i) => (
                <img
                  key={i}
                  src={image.url}
                  alt="Existing"
                  className="h-16 w-16 rounded-lg object-cover border"
                />
              ))}
            </div>
          )}
        </div>

        <div className="pt-2">
          <FormButton isLoading={isLoading} name="Save Product" />
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
