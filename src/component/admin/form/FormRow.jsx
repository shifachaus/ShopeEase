const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="mb-4">
      <label
        className="block text-gray-700 text-sm font-bold mb-2"
        htmlFor={labelText ? labelText : name}
      >
        {labelText ? labelText : name}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={name}
        placeholder={name}
      />
    </div>
  );
};

export default FormRow;
