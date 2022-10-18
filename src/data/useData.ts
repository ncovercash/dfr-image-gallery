import { useQuery } from "@tanstack/react-query";
import ky from "ky";

export interface EventImage {
  src: string;
  caption: string;
}

export interface Event {
  title: string;
  url: string;
  subtitle: string;
  images: EventImage[];
}

export default function useData(): Event[] | undefined {
  return useQuery<Event[]>(["images"], async () => {
    const response = await ky.get("https://dutchforkrunners.com/Gallery/images.json", {
      cache: "no-cache",
    });
    return response.json<Event[]>();
  }).data;
}
