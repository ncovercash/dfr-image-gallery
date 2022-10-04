import { useMemo, useState } from "react";
import fuzzysort from "fuzzysort";

export interface EventImage {
  src: string;
}

export interface Event {
  title: string;
  url: string;
  subtitle: string;
  images: EventImage[];
}

const baseImageSet = [
  {
    title: "Sample Race 93k",
    subtitle: "September 8, 2023",
    url: "sample-race-93k",
    images: [
      {
        src: "https://placekitten.com/499/501",
      },
    ],
  },
  {
    title: "Sample Race 26k",
    subtitle: "January 17, 2002",
    url: "sample-race-26k",
    images: [
      {
        src: "https://placekitten.com/497/498",
      },
    ],
  },
  {
    title: "Sample Event 40k",
    subtitle: "February 17, 2017",
    url: "sample-event-40k",
    images: [
      {
        src: "https://placekitten.com/499/499",
      },
    ],
  },
  {
    title: "Sample Race 34k",
    subtitle: "May 15, 2035",
    url: "sample-race-34k",
    images: [
      {
        src: "https://placekitten.com/501/498",
      },
    ],
  },
  {
    title: "Zoom zoom 96k",
    subtitle: "June 28, 2015",
    url: "zoom-zoom-96k",
    images: [
      {
        src: "https://placekitten.com/498/497",
      },
    ],
  },
  {
    title: "Sample Event 91k",
    subtitle: "April 23, 2029",
    url: "sample-event-91k",
    images: [
      {
        src: "https://placekitten.com/501/502",
      },
    ],
  },
  {
    title: "Sample Event 33k",
    subtitle: "October 15, 2034",
    url: "sample-event-33k",
    images: [
      {
        src: "https://placekitten.com/498/502",
      },
    ],
  },
  {
    title: "Sample Race 27k",
    subtitle: "April 4, 2014",
    url: "sample-race-27k",
    images: [
      {
        src: "https://placekitten.com/499/498",
      },
    ],
  },
  {
    title: "Sample Event 99k",
    subtitle: "May 12, 2035",
    url: "sample-event-99k",
    images: [
      {
        src: "https://placekitten.com/499/502",
      },
    ],
  },
  {
    title: "Sample Race 58k",
    subtitle: "July 2, 2009",
    url: "sample-race-58k",
    images: [
      {
        src: "https://placekitten.com/498/498",
      },
    ],
  },
  {
    title: "Sample Event 86k",
    subtitle: "March 23, 2036",
    url: "sample-event-86k",
    images: [
      {
        src: "https://placekitten.com/497/499",
      },
    ],
  },
  {
    title: "Sample Event 90k",
    subtitle: "March 25, 2025",
    url: "sample-event-90k",
    images: [
      {
        src: "https://placekitten.com/501/499",
      },
    ],
  },
  {
    title: "Sample Race 64k",
    subtitle: "August 8, 2036",
    url: "sample-race-64k",
    images: [
      {
        src: "https://placekitten.com/502/501",
      },
    ],
  },
  {
    title: "Zoom zoom 83k",
    subtitle: "April 21, 2029",
    url: "zoom-zoom-83k",
    images: [
      {
        src: "https://placekitten.com/499/497",
      },
    ],
  },
  {
    title: "Sample Race 86k",
    subtitle: "March 29, 2003",
    url: "sample-race-86k",
    images: [
      {
        src: "https://placekitten.com/497/501",
      },
    ],
  },
  {
    title: "Zoom zoom 27k",
    subtitle: "October 5, 2005",
    url: "zoom-zoom-27k",
    images: [
      {
        src: "https://placekitten.com/502/497",
      },
    ],
  },
  {
    title: "Sample Race 96k",
    subtitle: "June 4, 2032",
    url: "sample-race-96k",
    images: [
      {
        src: "https://placekitten.com/502/498",
      },
    ],
  },
  {
    title: "Sample Event 94k",
    subtitle: "March 24, 2024",
    url: "sample-event-94k",
    images: [
      {
        src: "https://placekitten.com/497/502",
      },
    ],
  },
  {
    title: "Sample Event 93k",
    subtitle: "March 18, 2020",
    url: "sample-event-93k",
    images: [
      {
        src: "https://placekitten.com/502/499",
      },
    ],
  },
  {
    title: "Sample Race 6k",
    subtitle: "February 5, 2001",
    url: "sample-race-6k",
    images: [
      {
        src: "https://placekitten.com/498/501",
      },
    ],
  },
  {
    title: "Sample Event 6k",
    subtitle: "May 2, 2031",
    url: "sample-event-6k",
    images: [
      {
        src: "https://placekitten.com/498/499",
      },
    ],
  },
  {
    title: "Zoom zoom 82k",
    subtitle: "December 21, 2001",
    url: "zoom-zoom-82k",
    images: [
      {
        src: "https://placekitten.com/501/500",
      },
    ],
  },
  {
    title: "Zoom zoom 42k",
    subtitle: "October 30, 2035",
    url: "zoom-zoom-42k",
    images: [
      {
        src: "https://placekitten.com/500/497",
      },
    ],
  },
  {
    title: "Sample Race 37k",
    subtitle: "August 30, 2000",
    url: "sample-race-37k",
    images: [
      {
        src: "https://placekitten.com/500/501",
      },
    ],
  },
  {
    title: "Zoom zoom 26k",
    subtitle: "April 6, 2024",
    url: "zoom-zoom-26k",
    images: [
      {
        src: "https://placekitten.com/501/497",
      },
    ],
  },
  {
    title: "Sample Event 55k",
    subtitle: "October 13, 2017",
    url: "sample-event-55k",
    images: [
      {
        src: "https://placekitten.com/502/502",
      },
    ],
  },
  {
    title: "Sample Race 23k",
    subtitle: "May 21, 2019",
    url: "sample-race-23k",
    images: [
      {
        src: "https://placekitten.com/501/501",
      },
    ],
  },
  {
    title: "Zoom zoom 5k",
    subtitle: "August 21, 2032",
    url: "zoom-zoom-5k",
    images: [
      {
        src: "https://placekitten.com/499/500",
      },
    ],
  },
  {
    title: "Sample Race 65k",
    subtitle: "July 31, 2028",
    url: "sample-race-65k",
    images: [
      {
        src: "https://placekitten.com/500/498",
      },
    ],
  },
  {
    title: "Zoom zoom 44k",
    subtitle: "November 21, 2004",
    url: "zoom-zoom-44k",
    images: [
      {
        src: "https://placekitten.com/497/497",
      },
    ],
  },
  {
    title: "Zoom zoom 78k",
    subtitle: "March 30, 2028",
    url: "zoom-zoom-78k",
    images: [
      {
        src: "https://placekitten.com/502/500",
      },
    ],
  },
  {
    title: "Zoom zoom 7k",
    subtitle: "July 24, 2039",
    url: "zoom-zoom-7k",
    images: [
      {
        src: "https://placekitten.com/497/500",
      },
    ],
  },
  {
    title: "Sample Event 61k",
    subtitle: "December 20, 2030",
    url: "sample-event-61k",
    images: [
      {
        src: "https://placekitten.com/500/499",
      },
    ],
  },
  {
    title: "Zoom zoom 76k",
    subtitle: "December 2, 2030",
    url: "zoom-zoom-76k",
    images: [
      {
        src: "https://placekitten.com/500/500",
      },
    ],
  },
];

export default function useImages(): { images: Event[]; setSearch: (newSearch: string) => void } {
  const [search, setSearch] = useState<string>("");

  const images = useMemo(() => {
    if (search.trim() === "") {
      return baseImageSet;
    }

    const results = fuzzysort.go(search, baseImageSet, {
      keys: ["title", "subtitle"],
      threshold: -900,
      // subtitles are 100 "points" worse
      scoreFn: (a) => Math.max(a[0] ? a[0].score : -1000, a[1] ? a[1].score - 100 : -1000),
    });
    return results.map((r) => ({ ...r.obj }));
  }, [search]);

  return {
    images,
    setSearch,
  };
}
