export default function Input({ classes, placeholder, type, value, onChange }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      defaultValue={value}
      onChange={onChange}
      className={`px-5 py-2 rounded-md border border-[#6C63FF] focus:outline-none focus:border-[#8e88ff] ${classes}`}
    />
  );
}
