import themeLogo from "../../assets/Vector.svg";

export default function Theme() {
  return (
    <button className="bg-[#6C63FF] w-14">
      <img src={themeLogo} alt="Theme Logo" />
    </button>
  );
}
