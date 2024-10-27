import optionsService from "@/api/options";
import { useState, useEffect } from "react";

const useOptions = () => {
  const [options, setOption] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOption = async () => {
      try {
        setLoading(true);
        const result = await optionsService.getList();
        setOption(result?.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchOption();
  }, []);

  return options;
};

export default useOptions;
