import { useMutation, useQueryClient } from "@tanstack/react-query";
import ky from "ky";
import type { Event } from "./useData";

export default function useSetData(password: string, setTempData: (n: Event[]) => void) {
  const queryClient = useQueryClient();

  return useMutation(
    (newData: Event[]) => {
      const d = new FormData();
      d.append("pass", password);
      d.append("data", JSON.stringify(newData));
      setTempData(newData);
      return ky.post("https://dutchforkrunners.com/Gallery/api/save.php", { body: d });
    },
    {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries(["images"]);
      },
      onError: () => {
        // eslint-disable-next-line no-alert
        alert("Unable to save!  Please reload and clean the state...");
      },
    },
  ).mutate;
}
