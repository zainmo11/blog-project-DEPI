import { useState } from "react";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import useFetch from "../hooks/useFetch";

import { useSearchParams } from "react-router-dom";

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [data, loading] = useFetch(`/search`, search);

  return (
    <>
      <div className="flex items-center gap-2 mb-2">
        <input
          className="border p-2 rounded-md"
          placeholder="Search ..."
          value={search}
          type="text"
          onChange={(e) => {
            setSearch(e.target.value);
            setSearchParams({ q: e.target.value });
          }}
        />
        {/* <Button action={}>Search</Button> */}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          <Loading />
        ) : (
          data.map((e, i) => {
            return <PostCard id={e.id} title={e.title} body={e.body} key={i} />;
          })
        )}
      </div>
    </>
  );
}
