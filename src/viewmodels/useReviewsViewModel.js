import { useEffect, useState } from "react";
import { reviewsService } from "../services/reviewsService";
import { ReviewList } from "../models/Review";

export function useReviewsViewModel(productId) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const raw = productId
          ? await reviewsService.listByProduct(productId)
          : await reviewsService.listAll();
        if (!cancelled) setReviews(ReviewList(raw));
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [productId]);

  return { reviews, loading, error };
}
