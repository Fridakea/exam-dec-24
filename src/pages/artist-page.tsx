import { LoadingSpinner } from "@/components/LoadingSpinner";
import useFetch from "@/hooks/use-fetch";
import { apiBaseUrl, BandData, BandPerformanceData, getBandPerformanceData, ScheduleData } from "@/lib/api";
import { ERoutes } from "@/main";
import { Link, useParams } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

export const ArtistPage = () => {
  const { slug } = useParams();

  const { error, isPending, data: band } = useFetch<BandData>(`${apiBaseUrl}/bands/${slug}`);
  const { error: sError, isPending: isSPending, data: schedule } = useFetch<ScheduleData>(`${apiBaseUrl}/schedule`);

  const [bandPerformanceData, setBandPerformanceData] = useState<BandPerformanceData | null>(null);

  const lastMember = band?.members[band.members.length - 1];

  useEffect(() => {
    if (!schedule || !band) return;
    setBandPerformanceData(getBandPerformanceData(schedule, band.name));
  }, [schedule, band]);

  return (
    <div>
      {error && <div>{error}</div>}
      {sError && <div>{sError}</div>}

      {(isPending || isSPending) && <LoadingSpinner />}
      {band && bandPerformanceData && (
        <div>
          <div className="mb-4 flex gap-2 items-center text-muted-foreground sm:hidden">
            <Link to={ERoutes.SCHEDULE}>Program</Link>
            <ChevronRight />
            <Link to={`${ERoutes.SCHEDULE}/${band.slug}`}>{band.name}</Link>
          </div>

          <section className="h-[80vh] flex flex-col gap-10 sm:flex-row sm:gap-20">
            <img
              src={`${apiBaseUrl}/logos/${band.logo}`}
              alt={band.logoCredits}
              className="w-full h-52 object-cover sm:h-full sm:w-52 sm:flex-1"
            />

            <div className="sm:flex-[2]">
              <div className="hidden mb-10 gap-2 items-center text-muted-foreground sm:inline-flex">
                <Link to={ERoutes.SCHEDULE}>Program</Link>
                <ChevronRight />
                <Link to={`${ERoutes.SCHEDULE}/${band.slug}`}>{band.name}</Link>
              </div>

              <h1 className="mb-5">{band.name}</h1>
              <div className="flex gap-2 items-center mb-5">
                <h2>
                  {bandPerformanceData.day} Kl. {bandPerformanceData.start}
                </h2>
                <h2 className="mt-1">*</h2>
                <h2>På {bandPerformanceData.scene}</h2>
              </div>
              <p>{band.bio}</p>
              <h3>Genre: {band.genre}</h3>
              <h3>
                Medlemmer:
                {band.members.map((member) => {
                  !lastMember ? member + "," : member;
                })}
              </h3>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
