import { LinksFunction, LoaderFunction, MetaFunction } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { Films, getFilms } from "~/api/films";
import Button from "~/components/Button";

export const meta: MetaFunction = () => {
  return { title: "Studio Ghibli | Films" };
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: "styles" }];
};

// SERVER SIDE CODE
export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const title = url.searchParams.get("title");
  return getFilms(title);
};

// CLIENT SIDE
export default function FilmsIndex() {
  const films = useLoaderData<Films>();
  return (
    <div className="p-16 font-sans">
      <h1 className="text-5xl font-bold text-center">Studio Ghibli Films</h1>

      <Form reloadDocument method="get" className="py-5">
        <Button type="submit">
          Search
        </Button>{" "}
        <input
          type="text"
          name="title"
          placeholder="Type a title..."
          className="border-2 rounded py-2 px-3"
        />
      </Form>

      <div className="grid grid-cols-4 gap-4">
        {films.map((f) => {
          return (
            <Link
              to={f.id}
              key={f.id}
              title={f.title}
              className="hover:shadow-2xl hover:scale-105 hover:font-bold cursor-pointer"
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
