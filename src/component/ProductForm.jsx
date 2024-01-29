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
    <div className="bg-white shadow-lg rounded">
      <form onSubmit={(e) => handlerSubmit(e)} className="px-5 pt-6 pb-8">
        <FormRow
          type="text"
          name="name"
          value={values.name}
          handleChange={handleChange}
          labelText={"Product Name"}
        />
        <FormRow
          type="number"
          name="price"
          value={values.price}
          handleChange={handleChange}
          labelText={"Product Price"}
        />

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            onChange={handleChange}
            name="category"
            value={values?.category}
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

        <FormRow
          type="text"
          name="description"
          value={values.description}
          handleChange={handleChange}
          labelText={"Product Description"}
        />
        <FormRow
          type="number"
          name="stock"
          value={values.stock}
          handleChange={handleChange}
          labelText={"Stock"}
        />

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

        <FormButton isLoading={isLoading} name={"Create"} />
      </form>
    </div>
  );
};

export default ProductForm;
