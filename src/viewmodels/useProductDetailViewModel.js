import { useCallback, useEffect, useState } from "react";
import { productsService } from "../services/productsService";
import { cartService } from "../services/cartService";
import { Product } from "../models/Product";

export function useProductDetailViewModel(productId, userId = "guest") {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const raw = await productsService.getById(productId);
        if (!cancelled) setProduct(Product(raw));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (productId) load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  const addToCart = useCallback(
    async (quantity = 1) => {
      setAdding(true);
      try {
        await cartService.addItem(userId, productId, quantity);
        setAdded(true);
      } catch (err) {
        setError(err.message);
      } finally {
        setAdding(false);
      }
    },
    [productId, userId]
  );

  return { product, loading, error, adding, added, addToCart };
}
