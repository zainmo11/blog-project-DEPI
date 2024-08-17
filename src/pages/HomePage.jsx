import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import useFetch from "../hooks/useFetch";
import { useSearchParams } from "react-router-dom";

export default function HomePage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [search, setSearch] = useState(searchParams.get("q") || "");
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1); // State for current page
    const [sortOption, setSortOption] = useState("asc"); // State for sorting order
    const [data, loading] = useFetch(`/search`, search); // Fetch all data
    const [sortedData, setSortedData] = useState([]); // State for sorted data
    const pageSize = 10; // Number of items per page

    // Calculate the data to be displayed on the current page
    const paginatedData = sortedData.slice((page - 1) * pageSize, page * pageSize);

    useEffect(() => {
        if (data.length) {
            handleSort(); // Apply sorting whenever data or sortOption changes
        }
    }, [data, sortOption]);

    useEffect(() => {
        setPage(Number(searchParams.get("page")) || 1);
    }, [searchParams]);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        setSearchParams({ q: search, page: newPage });
    };

    const handleSort = () => {
        const sorted = [...data].sort((a, b) => {
            const titleA = a.title?.toLowerCase() || "";
            const titleB = b.title?.toLowerCase() || "";

            return sortOption === "asc" ? titleA.localeCompare(titleB) : titleB.localeCompare(titleA);
        });
        setSortedData(sorted);
    };

    const handleSortOptionChange = () => {
        setSortOption((prev) => (prev === "asc" ? "desc" : "asc"));
    };


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
                        setSearchParams({ q: e.target.value, page: 1 }); // Reset to page 1 on search
                    }}
                />
                <select
                    className="border p-2 rounded-md"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value)}
                >
                    <option value="asc">Sort by Tag: Ascending</option>
                    <option value="desc">Sort by Tag: Descending</option>
                </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <Loading />
                ) : (
                    paginatedData.map((e, i) => {
                        return <PostCard id={e.id} title={e.title} body={e.body} tag={e.tag} key={i} />;
                    })
                )}
            </div>
            <div className="flex justify-center gap-2 mt-4">
                <button
                    className="border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </button>
                <span className="px-4 py-2">{page}</span>
                <button
                    className="border px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page * pageSize >= sortedData.length}
                >
                    Next
                </button>
            </div>
        </>
    );
}
