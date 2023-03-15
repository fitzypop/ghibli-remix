import { Form, useActionData, useNavigation } from "@remix-run/react";
import { CommentEntry } from "~/api/comments";
import Button from "./Button";

type CommentsListProps = {
  filmId: string;
  comments: CommentEntry[];
};

export default function CommentsList({ filmId, comments }: CommentsListProps) {
  const nav = useNavigation();
  const actionData = useActionData();

  const inputStyle = (fieldName: string) =>
    `border border-slate-400 rounded py-2 px-3 inline-block w-full ${
      actionData?.errors[fieldName] ? "border-red-500" : ""
    }`;

  return (
    <div>
      <h2 className="mb-2 text-3xl">Community Comments</h2>

      <div className="my-3 flex flex-col space-y-4">
        {comments.map((com) => (
          <div className="rounded border border-slate-400 p-4">
            <div className="mb-2 text-xl font-bold text-gray-700">
              {com.name}
            </div>
            <p className="text-gray-700">{com.message}</p>
          </div>
        ))}

        <div className="rounded border border-slate-400 p-4">
          <Form method="post" action={`/films/${filmId}`}>
            <fieldset disabled={nav.state === "submitting"}>
              <label htmlFor="name" className="my-2 inline-block">
                Name:
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className={inputStyle("name")}
              />
              {actionData?.errors.name && (
                <p className="text-red-500">{actionData.errors.name}</p>
              )}

              <label htmlFor="message" className="my-2 inline-block">
                Message:
              </label>
              <textarea
                name="message"
                id="message"
                className={inputStyle("message")}
              />
              {actionData?.errors.message && (
                <p className="text-red-500">{actionData.errors.message}</p>
              )}

              <Button type="submit">
                {nav.state === "submitting" ? "Adding..." : "Add Comment"}
              </Button>
            </fieldset>
          </Form>
        </div>
      </div>
    </div>
  );
}
