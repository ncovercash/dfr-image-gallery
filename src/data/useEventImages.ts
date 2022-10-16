import fuzzysort from "fuzzysort";
import { useMemo, useState } from "react";
import { Event, EventImage } from "./useData";

export default function useEventImages(event?: Event): {
  images?: EventImage[];
  setSearch: (newSearch: string) => void;
} {
  const [search, setSearch] = useState<string>("");

  const images = useMemo(() => {
    if (event === undefined) {
      return undefined;
    }

    if (search.trim() === "") {
      return event.images;
    }

    const results = fuzzysort.go(search, event.images, {
      key: "caption",
      threshold: -900,
    });
    return results.map((r) => r.obj);
  }, [search, event]);

  return {
    images,
    setSearch,
  };
}
