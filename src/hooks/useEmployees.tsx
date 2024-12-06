import employeesService from "@/api/employees";
import { useState, useEffect } from "react";

interface UseEmployeesParams {
  [key: string]: any;
}

const useEmployees = ({ limit, skip, name }: UseEmployeesParams) => {
  const [employeesData, setEmployeesData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      setLoading(true);
      setError(null);

      try {
        const query: any = {};

        if (limit !== undefined) query.$limit = limit;
        if (skip !== undefined) query.$skip = skip;
        if (name) query.name = { $iLike: `%${name}%` };
        query.role = "employee";

        Object.keys(query).forEach((key) => {
          if (
            query[key] === null ||
            query[key] === undefined ||
            query[key] === ""
          ) {
            delete query[key];
          }
        });

        const response = await employeesService.getList(query);
        setEmployeesData(response?.data || {});
      } catch (err) {
        setError("Failed to fetch employees.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [limit, skip, name]);

  return employeesData;
};

export default useEmployees;
