import productsService from "@/api/products";
import { useState, useEffect } from "react";

const useProduct = (sku: string | string[] | undefined) => {
  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (typeof sku === "string") {
          const result = await productsService.getOneBySKU(sku);
          setProduct(result?.data);
        } else {
          throw new Error("Invalid SKU");
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, []);

  return { product, loading };
};

export default useProduct;
