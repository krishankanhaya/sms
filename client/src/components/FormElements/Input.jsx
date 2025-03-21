const Input = ({
  label,
  name,
  register,
  type,
  placeholder,
  errors,
  className = "p-2 rounded outline-yellow-400"
}) => {
  return (
    <div className="flex flex-col">
      {label !== '' &&
        <label htmlFor={name} className="text-left pl-1">
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </label>
      }
      <input
        {...register(name)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        className={className} />
      {errors[`${name}`] && (
        <span className="text-left text-sm text-red-400">{errors[`${name}`]?.message}</span>
      )}
    </div>
  );
};

export default Input;
