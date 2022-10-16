import useData, { Event } from "./useData";

export default function useEvent(eventId: string | undefined): Event | undefined {
  const baseImageSet = useData();

  if (baseImageSet === undefined) return undefined;

  const event = baseImageSet.filter((e) => e.url === eventId)[0];

  if (event === undefined) {
    throw new Error("Unknown URL");
  }

  return event;
}
