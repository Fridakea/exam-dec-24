import { useMemo, useState } from "react";
import useFetch from "@/hooks/use-fetch";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ERoutes } from "@/main";
import { apiBaseUrl, BandData } from "@/lib/api";

// import { PiHeartStraight } from "react-icons/pi";
import { Heart } from "lucide-react";

export const SchedulePage = () => {
  const { error, isPending, data } = useFetch<BandData[]>(`${apiBaseUrl}/bands`);
  const [amountOfDataShown, setAmountOfDataShown] = useState(12);

  // "Cacher" den slicede data, indtil amountOfDataShown eller data ændrer sig.
  const slicedData = useMemo(() => data?.slice(0, amountOfDataShown), [amountOfDataShown, data]);

  return (
    <div className="flex flex-col">
      <h1 className="mb-8">Program</h1>
      <div className="mb-4">
        <p>Søg og filter...</p>
      </div>

      <section className="mb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
        {error && <div>{error}</div>}
        {isPending && <LoadingSpinner />}
        {slicedData?.map((band: any, i: number) => {
          return (
            <Link
              to={`${ERoutes.BAND}/${band.slug}`}
              key={i}
              className="relative w-full h-full p-2 inline-flex flex-col gap-2"
            >
              <Button variant="link" className="absolute -right-1 top-1 bg-transparent text-accent z-10">
                <Heart className="!w-10 !h-10" />
              </Button>
              <img
                src={`${apiBaseUrl}/logos/${band.logo}`}
                alt={band.logoCredits}
                className="w-full h-48 object-cover transition-all hover:scale-105"
              />
              <h2 className="~text-xl/2xl text-center">{band.name}</h2>
            </Link>
          );
        })}
      </section>

      {!isPending && (
        <Button
          size="lg"
          variant="accent"
          className="self-end"
          onClick={() => setAmountOfDataShown(amountOfDataShown + 12)}
          disabled={!data || amountOfDataShown >= data.length}
        >
          Vis flere
        </Button>
      )}
    </div>
  );
};
