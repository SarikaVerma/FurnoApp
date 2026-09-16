import { useCallback, useEffect, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { productsService } from "../services/productsService";
import { categoriesService } from "../services/categoriesService";
import { cartService } from "../services/cartService";
import { ProductList } from "../models/Product";

// Owns all state and logic for the Home/Catalog screen. The screen (View)
// just calls the functions this returns and renders the data — it never
// talks to the service layer or touches raw API shapes directly.
export function useHomeViewModel(userId = "guest", incomingFilters = null) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  // productId -> quantity currently in the cart, so the catalog stepper
  // always shows the real cart count instead of a separate local guess.
  const [cartQuantities, setCartQuantities] = useState({});

  const applyCartRows = useCallback((rows) => {
    const map = {};
    rows.forEach((row) => {
      map[row.productId] = row.quantity;
    });
    setCartQuantities(map);
  }, []);

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

  // Re-runs whenever a new filter set arrives via navigation params — from
  // the Filters screen, or from tapping a category tile on this screen
  // itself. The stack navigator reuses this screen instance instead of
  // remounting it, so a mount-only effect would never see the new params.
  useEffect(() => {
    load(incomingFilters || {});
  }, [load, incomingFilters]);

  // The category tiles live on this screen now (moved off Filters), so
  // Home needs the category list itself.
  useEffect(() => {
    categoriesService.list().then(setCategories);
  }, []);

  // The stack navigator reuses this screen instance instead of remounting
  // it, so a mount-only effect would keep showing stale per-product counts
  // after checkout clears the cart elsewhere (Cart -> Payment -> Order
  // confirmation -> back to this same Home instance). Refresh on every
  // focus instead, same fix already applied to useCartViewModel.
  useFocusEffect(
    useCallback(() => {
      cartService.list(userId).then(applyCartRows);
    }, [userId, applyCartRows])
  );

  const addToCart = useCallback(
    async (productId, delta = 1) => {
      try {
        const rows = await cartService.addItem(userId, productId, delta);
        applyCartRows(rows);
      } catch (err) {
        setError(err.message);
      }
    },
    [userId, applyCartRows]
  );

  return {
    products,
    categories,
    selectedCategory: incomingFilters?.category ?? null,
    loading,
    error,
    search,
    setSearch,
    reload: () => load(incomingFilters || {}),
    cartQuantities,
    addToCart,
  };
}
