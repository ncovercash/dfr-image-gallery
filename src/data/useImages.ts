import { useMemo, useState } from "react";
import fuzzysort from "fuzzysort";
import useData, { Event } from "./useData";

export default function useImages(): {
  images: Event[] | undefined;
  setSearch: (newSearch: string) => void;
  } {
  const baseImageSet = useData();

  const [search, setSearch] = useState<string>("");

  const images = useMemo(() => {
    if (search.trim() === "" || baseImageSet === undefined) {
      return baseImageSet;
    }

    const results = fuzzysort.go(search, baseImageSet, {
      keys: ["title", "subtitle"],
      threshold: -900,
      // subtitles are 100 "points" worse
      scoreFn: (a) => Math.max(a[0] ? a[0].score : -1000, a[1] ? a[1].score - 100 : -1000),
    });
    return results.map((r) => r.obj);
  }, [search, baseImageSet]);

  return {
    images,
    setSearch,
  };
}
