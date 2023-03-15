type ButtonProps = {
  type: "button" | "reset" | "submit";
  children: any;
};

export default function Button({ type, children }: ButtonProps) {
  return (
    <button
      type={type}
      className="my-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      {children}
    </button>
  );
}
