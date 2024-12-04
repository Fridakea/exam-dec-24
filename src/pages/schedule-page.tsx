import { useMemo, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";

export const SchedulePage = () => {
  const { error, isPending, data } = useFetch("http://localhost:8080/bands");
  const [amountOfDataShown, setAmountOfDataShown] = useState(10);

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
          return <p key={i}>{artist.name}</p>;
        })}

      {amountOfDataShown < data?.length && (
        <Button onClick={() => setAmountOfDataShown(amountOfDataShown + 40)}>
          Vis flere
        </Button>
      )}
    </div>
  );
};
