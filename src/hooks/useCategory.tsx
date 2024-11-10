import { useState, useEffect } from "react";
import categoriesService from "@/api/categories";

const useCategory = (id: string) => {
  const [category, setCategory] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoriesService.getOne(id);
        setCategory(response?.data || {});
      } catch (err) {
        setError("Failed to fetch category.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, []);

  return { category, loading };
};

export default useCategory;
