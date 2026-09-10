import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { cartService } from "../services/cartService";
import { ordersService } from "../services/ordersService";
import { CartItemList, cartTotal } from "../models/CartItem";

export function useCartViewModel(userId = "guest") {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const raw = await cartService.list(userId);
      setItems(CartItemList(raw));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  // The stack navigator reuses an already-mounted Cart screen instance
  // instead of remounting it, so a mount-only effect would only ever show
  // whatever was in the cart the first time it was opened. Reloading on
  // focus keeps it in sync with items added from other screens.
  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const updateQuantity = useCallback(
    async (cartItemId, quantity) => {
      if (quantity < 1) return;
      try {
        const raw = await cartService.updateQuantity(cartItemId, quantity, userId);
        setItems(CartItemList(raw));
      } catch (err) {
        setError(err.message);
      }
    },
    [userId]
  );

  const removeItem = useCallback(
    async (cartItemId) => {
      try {
        const raw = await cartService.removeItem(cartItemId, userId);
        setItems(CartItemList(raw));
      } catch (err) {
        setError(err.message);
      }
    },
    [userId]
  );

  const checkout = useCallback(async () => {
    setCheckingOut(true);
    setError(null);
    try {
      const order = await ordersService.checkout(userId);
      setItems([]);
      return order;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setCheckingOut(false);
    }
  }, [userId]);

  return {
    items,
    total: cartTotal(items),
    loading,
    error,
    checkingOut,
    reload: load,
    updateQuantity,
    removeItem,
    checkout,
  };
}
