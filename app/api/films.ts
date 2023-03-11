import { type CommentEntry, getComments } from "./comments";

export type FilmCharacter = {
  id: string;
  name: string;
  gender?: string;
  age?: string;
  eye_color?: string;
  hair_color?: string;
};

export type Film = {
  id: string;
  title: string;
  original_title: string;
  description: string;
  image: string;
  movie_banner: string;
  people: string[];
  characters?: FilmCharacter[];
  comments?: CommentEntry[];
};

export type Films = Film[];

const BASE_URI = `${process.env.GHIBLIAPI_DOMAIN}/api`;
const FILMS_URI = `${BASE_URI}/films`;
const PEOPLE_URI = `${BASE_URI}/people`;

export async function getFilms(title?: string | null) {
  const response = await fetch(FILMS_URI);
  const films: Films = await response.json();
  return films.filter((film) =>
    title ? film.title.toLowerCase().includes(title.toLowerCase()) : true
  );
}

export async function getFilmById(filmId: string) {
  const response = await fetch(`${FILMS_URI}/${filmId}`);
  const film: Film = await response.json();
  const comments = await getComments(filmId);
  const characters = await Promise.all(
    film.people
      .filter((url) => url !== PEOPLE_URI)
      .map((url) => fetch(url).then((res) => res.json())),
  );
  return { ...film, characters, comments };
}

export async function getFilmCharacter(id: string): Promise<FilmCharacter> {
  const response = await fetch(`${PEOPLE_URI}/${id}`);

  if (!response.ok) {
    throw response;
  }

  return response.json();
}
