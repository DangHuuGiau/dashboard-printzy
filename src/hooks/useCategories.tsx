import { useState, useEffect } from "react";
import categoriesService from "@/api/categories";
interface Params {
  name?: string;
}

const useCategories = ({ name }: Params = {}) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const query: any = {};
        if (name) query.name = { $iLike: `%${name}%` };

        const response = await categoriesService.getList(query);
        setCategories(response?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [name]);

  return { categories, loading };
};

export default useCategories;
