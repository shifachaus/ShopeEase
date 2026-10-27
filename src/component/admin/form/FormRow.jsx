const FormRow = ({
  type = "text",
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  required = false,
}) => {
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {labelText || name}
      </label>

      <input
        id={name}
        type={type}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        placeholder={placeholder || `Enter ${labelText || name}`}
        required={required}
        className="w-full rounded-lg border border-gray-200 bg-white px-3 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 hover:border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10"
      />
    </div>
  );
};

export default FormRow;
