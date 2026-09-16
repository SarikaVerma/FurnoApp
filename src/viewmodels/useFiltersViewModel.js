import { useCallback, useState } from "react";

// Category selection moved to a tile grid on the Home screen. This
// viewmodel now only owns price/color; it carries forward whatever
// category was already selected on Home so hitting "Apply filters" here
// doesn't wipe it out.
export function useFiltersViewModel(onApply, initialFilters = {}) {
  const [minPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(initialFilters.maxPrice ?? 505);
  const [selectedColor, setSelectedColor] = useState(initialFilters.color ?? null);

  const apply = useCallback(() => {
    onApply?.({
      category: initialFilters.category ?? null,
      minPrice,
      maxPrice,
      color: selectedColor,
    });
  }, [onApply, minPrice, maxPrice, selectedColor, initialFilters.category]);

  return {
    minPrice,
    maxPrice,
    setMaxPrice,
    selectedColor,
    setSelectedColor,
    apply,
  };
}
