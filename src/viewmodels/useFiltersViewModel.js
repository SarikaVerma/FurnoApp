import { useCallback, useEffect, useState } from "react";
import { categoriesService } from "../services/categoriesService";

export function useFiltersViewModel(onApply) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minPrice] = useState(25);
  const [maxPrice, setMaxPrice] = useState(505);
  const [selectedColor, setSelectedColor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    categoriesService.list().then((data) => {
      if (!cancelled) {
        setCategories(data);
        setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const apply = useCallback(() => {
    onApply?.({
      category: selectedCategory,
      minPrice,
      maxPrice,
      color: selectedColor,
    });
  }, [onApply, selectedCategory, minPrice, maxPrice, selectedColor]);

  return {
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    minPrice,
    maxPrice,
    setMaxPrice,
    selectedColor,
    setSelectedColor,
    apply,
  };
}
