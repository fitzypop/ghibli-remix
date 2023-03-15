import { PropsWithChildren } from "react";

type ButtonProps = {
  type: "button" | "reset" | "submit";
};

export default function Button(props: PropsWithChildren<ButtonProps>) {
  return (
    <button
      type={props.type}
      className="my-2 rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700"
    >
      {props.children}
    </button>
  );
}
