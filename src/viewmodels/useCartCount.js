import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { cartService } from "../services/cartService";

// Total item quantity in the cart, for the TabBar's cart badge. Shared by
// any screen that doesn't already fetch the cart for its own purposes
// (Home derives its own badge count from the cart rows it fetches for the
// catalog quantity steppers instead of using this). Reloads on focus, not
// just mount, since the stack navigator reuses screen instances rather
// than remounting them — same reasoning as useCartViewModel/useHomeViewModel.
export function useCartCount() {
  const [count, setCount] = useState(0);

  useFocusEffect(
    useCallback(() => {
      cartService.list().then((rows) => {
        setCount(rows.reduce((sum, row) => sum + row.quantity, 0));
      });
    }, [])
  );

  return count;
}
