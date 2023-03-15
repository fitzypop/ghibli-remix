import { NavLink } from "@remix-run/react";
import { FilmCharacter } from "~/api/films";

type CharacterListProps = {
  characters?: FilmCharacter[];
};

export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="max-w-md flex-1">
      <h3 className="text-3xl">Characters</h3>

      <ul className="my-3 flex flex-col space-y-3">
        {characters?.map((char) => (
          <NavLink
            key={char.id}
            to={`characters/${char.id}`}
            prefetch="intent"
            className={({ isActive }) =>
              `inline-block w-full rounded border border-slate-400 p-3 hover:underline ${
                isActive
                  ? "border-2 bg-slate-300 font-bold text-black"
                  : "text-blue-500"
              }`
            }
          >
            {char.name}
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
