import productsService from "@/api/products";
import { useState, useEffect } from "react";

interface UseProductsParams {
  [key: string]: any;
}

const useProducts = ({
  limit,
  skip,
  name,
  categoryId,
  collectionId,
  price,
  color,
  style,
  size,
  sort,
}: UseProductsParams) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const orderOptions = {
    0: { createdAt: "ASC" },
    1: { price: "ASC" },
    2: { price: "DESC" },
  };

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);

      try {
        const query: any = {};

        if (limit !== undefined) query.$limit = limit;
        if (skip !== undefined) query.$skip = skip;
        if (name) query.name = { $iLike: `%${name}%` };
        if (categoryId !== undefined) query.categoryId = categoryId;
        if (collectionId !== undefined) query.collectionId = collectionId;
        query.options = { color, style, size };

        query.$order = orderOptions[sort as 0 | 1 | 2] || {};

        if (price) {
          const [minPrice, maxPrice] = price.split("-").map(Number);
          if (!isNaN(minPrice) && !isNaN(maxPrice)) {
            query.price = { $btw: [minPrice, maxPrice] };
          }
        }

        Object.keys(query).forEach((key) => {
          if (
            query[key] === null ||
            query[key] === undefined ||
            query[key] === ""
          ) {
            delete query[key];
          }
        });

        const response = await productsService.getList(query);
        setProducts(response?.data?.data || []);
      } catch (err) {
        setError("Failed to fetch products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [
    limit,
    skip,
    name,
    categoryId,
    collectionId,
    price,
    color,
    style,
    size,
    sort,
  ]);

  return products;
};

export default useProducts;
