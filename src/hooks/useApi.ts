"use client";

import { useState, useEffect, useCallback } from "react";
import { useHotel } from "@/providers/HotelProvider";

interface UseApiOptions {
  autoFetch?: boolean;
  params?: Record<string, string>;
}

interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useApi<T>(
  endpoint: string,
  options: UseApiOptions = {}
): UseApiResult<T> {
  const { autoFetch = true, params } = options;
  const { currentHotelId, isDemo } = useHotel();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    // In demo mode, don't fetch from API
    if (isDemo || !currentHotelId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const queryParams = new URLSearchParams(params || {});
      const url = `/api/hotels/${currentHotelId}${endpoint}${
        queryParams.toString() ? `?${queryParams.toString()}` : ""
      }`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Erreur ${res.status}`);
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err.message || "Erreur lors du chargement");
    } finally {
      setLoading(false);
    }
  }, [currentHotelId, endpoint, isDemo, params]);

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useApiMutation<T>(endpoint: string) {
  const { currentHotelId } = useHotel();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mutate = async (
    data: any,
    method: "POST" | "PUT" | "DELETE" = "POST"
  ): Promise<T | null> => {
    if (!currentHotelId) return null;

    try {
      setLoading(true);
      setError(null);

      const res = await fetch(`/api/hotels/${currentHotelId}${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || `Erreur ${res.status}`);
      }

      return await res.json();
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'opération");
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { mutate, loading, error };
}
