import { useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ERoutes } from "@/main";
import { apiBaseUrl, BandData, dayNames, EnrichedScheduleData, getEnrichedSchedule } from "@/lib/api";
import { findBandImage } from "@/lib/helpers";

export const SchedulePage = () => {
  const [enrichedScheduleData, setEnrichedScheduleData] = useState<EnrichedScheduleData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    getEnrichedSchedule()
      .then((data) => {
        setEnrichedScheduleData(data);
        setApiError(null);
        setIsLoading(false);
      })
      .catch((error) => {
        setApiError(error);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col">
      <h1 className="mb-8">Program</h1>
      <div className="mb-4">
        <p>Søg og filter...</p>
      </div>

      {apiError && <div>{apiError}</div>}
      {isLoading && <LoadingSpinner />}
      {enrichedScheduleData &&
        Object.entries(enrichedScheduleData).map(([_, bands], i) => (
          <section key={i}>
            <h2>{dayNames[i]}</h2>
            <p className="text-muted-foreground mb-4">{bands.length} bands spiller</p>

            <div className="mb-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-5">
              {bands.map((band, i) => (
                <Link
                  to={`${ERoutes.BAND}/${band.slug}`}
                  key={i}
                  className="relative w-full h-full inline-flex flex-col gap-2"
                >
                  <p className="absolute right-2 top-0 bg-transparent text-accent z-10">{band.scene}</p>
                  <img
                    src={findBandImage(band.logo)}
                    alt={band.logoCredits}
                    className="w-full h-52 sm:h-72 object-cover transition-all hover:scale-105"
                  />
                  <h3 className="text-center">{band.name}</h3>
                </Link>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
};
