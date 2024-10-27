import { useState, useEffect } from "react";
import collectionsService from "@/api/collections";

const useCollections = () => {
  const [collections, setCollections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await collectionsService.getList();
        setCollections(response?.data || []);
      } catch (err) {
        setError("Failed to fetch collections.");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  return collections;
};

export default useCollections;
