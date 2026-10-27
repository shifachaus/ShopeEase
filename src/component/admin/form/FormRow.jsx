const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="mb-4">
      <label
        className="mb-2 block text-sm font-medium text-gray-700"
        htmlFor={name}
      >
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        value={value ?? ""}
        onChange={handleChange}
        className="text-sm appearance-none border border-neutral-100 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        placeholder={labelText || name}
      />
    </div>
  );
};

export default FormRow;
