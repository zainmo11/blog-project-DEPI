import { Link } from "react-router-dom";

export default function PostCard({ id, title, body }) {
  return (
    <div className="border bg-white h-[350px]">
      <img
        className="w-full"
        src="https://random.imagecdn.app/500/150"
        alt=""
      />
      <div className="p-4 text-center">
        <h6 className="text-md font-medium">{title}</h6>
        <p className="text-sm">{body}</p>
      </div>

      <div className="w-full text-center">
        <Link
          className="p-2 bg-primary mt-2 w-full text-white rounded-md"
          to={`${id}`}
        >
          Open The Post
        </Link>
      </div>
    </div>
  );
}
