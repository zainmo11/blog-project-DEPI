import React from 'react';
import Loading from "../components/Loading";
import useFetch from "../hooks/useFetch";
import { Link, useParams, useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function PostPage() {
    const params = useParams();
    const navigate = useNavigate();
    const [data, loading] = useFetch(params.id);

    // Handle post deletion
    const handleDelete = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`https://dummyjson.com/posts/${params.id}`, {
                    method: 'DELETE',
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                alert('Post deleted successfully!');
                navigate('/');
            } catch (error) {
                console.error('Error:', error);
                alert('Failed to delete post');
            }
        }
    };

    return (
        <>
            {loading ? (
                <Loading />
            ) : (
                <div className="max-w-3xl mx-auto bg-white shadow-md rounded-lg p-6">
                    <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
                    <p className="my-4">{data.body}</p>
                    <h4 className="mb-2">Tags</h4>
                    <div className="flex items-center gap-2 mb-4">
                        {data.tags.map((e, i) => (
                            <span className="bg-fuchsia-800 text-white p-1 rounded-md" key={i}>
                {e}
              </span>
                        ))}
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button>
                            <Link to={`/${params.id}/update`} className="text-white">
                                Edit Post
                            </Link>
                        </Button>
                        <Button action={handleDelete} type="button">
                            Delete Post
                        </Button>
                    </div>
                </div>
            )}
        </>
    );
}
