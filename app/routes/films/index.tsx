import { LinksFunction, LoaderArgs, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { getFilms } from "~/api/films";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return { title: "Studio Ghibli | Films" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

// SERVER SIDE CODE
export const loader = async ({ request }: LoaderArgs) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

// CLIENT SIDE
export default function FilmsIndex() {
  const films = useLoaderData<typeof loader>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-center text-5xl font-bold">Studio Ghibli Films</h1>

      <Form reloadDocument method="get" className="py-5">
        <Button type="submit">Search</Button>{" "}
        <input
          type="text"
          name="title"
          placeholder="Type a title..."
          className="rounded border-2 py-2 px-3"
        />
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((f) => {
          return (
            <Link
              to={f.id}
              key={f.id}
              title={f.title}
              className="cursor-pointer hover:scale-105 hover:font-bold hover:shadow-2xl"
              prefetch="intent"
            >
              <div>{f.title}</div>
              <img src={f.image} alt={f.title} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
