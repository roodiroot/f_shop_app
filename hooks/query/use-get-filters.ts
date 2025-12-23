import { FiltersResponse } from "@/types/filters";
import { useQuery } from "@tanstack/react-query";

export function useGetFilters(categoryId: string) {
  return useQuery({
    queryKey: ["filters", categoryId],
    queryFn: async (): Promise<FiltersResponse> => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/filters/${categoryId}`
      );
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });
}
