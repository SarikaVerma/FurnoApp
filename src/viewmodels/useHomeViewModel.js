import { useCallback, useEffect, useState } from "react";
import { productsService } from "../services/productsService";
import { cartService } from "../services/cartService";
import { ProductList } from "../models/Product";

// Owns all state and logic for the Home/Catalog screen. The screen (View)
// just calls the functions this returns and renders the data — it never
// talks to the service layer or touches raw API shapes directly.
export function useHomeViewModel(userId = "guest") {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");

  const load = useCallback(async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const raw = await productsService.list(filters);
      setProducts(ProductList(raw));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const addToCart = useCallback(
    async (productId, quantity = 1) => {
      try {
        await cartService.addItem(userId, productId, quantity);
      } catch (err) {
        setError(err.message);
      }
    },
    [userId]
  );

  const applyFilters = useCallback(
    (filters) => load(filters),
    [load]
  );

  return {
    products,
    loading,
    error,
    search,
    setSearch,
    reload: load,
    addToCart,
    applyFilters,
  };
}
