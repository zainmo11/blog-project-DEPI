import { useState, useEffect } from "react";
import { api } from "../utils/axios";

export default function useFetch(params = "", query = "") {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // ▶ URLSearchParams {}

  const fetchData = async () => {
    try {
      const res = await api.get(`${params}`, {
        params: { q: query }, // Pass the query as a parameter to the API
      });
      if (res.data.hasOwnProperty("posts")) {
        setData(res.data.posts);
      } else {
        setData(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [query]);

  return [data, loading];
}
