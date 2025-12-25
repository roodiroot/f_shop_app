import { getMe } from "@/data/api/user";
import { useQuery } from "@tanstack/react-query";

export function useMe(token: string | null) {
  return useQuery({
    queryKey: ["me"],
    queryFn: () => getMe(token!),
    enabled: !!token,
    retry: false,
    staleTime: 60_000,
  });
}
