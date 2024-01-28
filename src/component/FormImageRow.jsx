const FormImageRow = ({ avatarPreview, handleFileUpload }) => {
  return (
    <div className="mb-6 flex items-center gap-2">
      <img
        className="rounded-full w-16 h-16 shadow-sm"
        src={avatarPreview}
        alt="Avatar Preview"
      />

      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center
	 w-full h-10  border-gray-300 
	 shadow appearance-none border
	  rounded-lg cursor-pointer bg-gray-50 
	  "
      >
        <p className="text-sm font-semibold text-gray-600">Click to upload</p>

        <input
          id="dropzone-file"
          className="hidden"
          type="file"
          name="avatar"
          accept="image/*"
          onChange={handleFileUpload}
        />
      </label>
    </div>
  );
};

export default FormImageRow;
