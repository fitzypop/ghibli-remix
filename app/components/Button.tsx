type ButtonProps = {
  type: "button" | "reset" | "submit";
  children: any;
};

export default function Button({ type, children }: ButtonProps) {
  return (
    <button
      type={type}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded my-2"
    >
      {children}
    </button>
  );
}
