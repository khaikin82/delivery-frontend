import { useState, useEffect } from "react";

function usePaginatedData(fetchFunction, dependencies = []) {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const pageSize = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetchFunction(page, pageSize);
      setData(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, ...dependencies]);

  return {
    data,
    page,
    pageSize,
    setPage,
    totalPages,
    loading,
    refetch: fetchData,
  };
}

export default usePaginatedData;
