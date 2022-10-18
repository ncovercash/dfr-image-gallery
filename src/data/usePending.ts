import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ky from "ky";

export interface PendingImage {
  file: string;
  event: string;
  caption: string;
}

export default function usePending(
  password: string,
): [PendingImage[] | undefined, (n: PendingImage[]) => void] {
  const queryClient = useQueryClient();

  return [
    useQuery<PendingImage[]>(["pending"], async () => {
      const response = await ky.get("https://dutchforkrunners.com/Gallery/pending.json", {
        cache: "no-cache",
      });
      return (await response.text())
        .split("\n")
        .filter((s) => s.trim().length)
        .map((s) => JSON.parse(s));
    }).data,
    useMutation(
      (newData: PendingImage[]) => {
        const d = new FormData();
        d.append("pass", password);
        d.append("data", newData.map((s) => JSON.stringify(s)).join("\n"));
        return ky.post("https://dutchforkrunners.com/Gallery/api/savePending.php", { body: d });
      },
      {
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries(["pending"]);
        },
        onError: () => {
          // eslint-disable-next-line no-alert
          alert("Unable to save!  Please reload and clean the state...");
        },
      },
    ).mutate,
  ];
}
