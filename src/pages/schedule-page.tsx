import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ERoutes } from "@/main";

export const SchedulePage = () => {
  const { error, isPending, data } = useFetch(
    "https://pentagonal-holy-beetle.glitch.me/bands"
    // https://pentagonal-holy-beetle.glitch.me/bands
    // http://localhost:8080/bands
  );
  const [amountOfDataShown, setAmountOfDataShown] = useState(12);

  // "Cacher" den slicede data, indtil amountOfDataShown eller data ændrer sig.
  const slicedData = useMemo(
    () => data?.slice(0, amountOfDataShown),
    [amountOfDataShown, data]
  );

  return (
    <div>
      <h1>Schedule</h1>
      {error && <div>{error}</div>}
      {isPending && <LoadingSpinner />}
      {data &&
        slicedData.map((artist: any, i: number) => {
          return (
            <Link
              to={`${ERoutes.ARTIST}/${artist.slug}`}
              key={i}
              className="inline-block p-2 bg-red-400"
            >
              <h1>{artist.name}</h1>
            </Link>
          );
        })}

      <Button
        onClick={() => setAmountOfDataShown(amountOfDataShown + 12)}
        disabled={amountOfDataShown >= data?.length}
      >
        Vis flere
      </Button>
    </div>
  );
};
