import useFetch from "@/hooks/use-fetch";
import { apiBaseUrl, BandData } from "@/lib/api";
import { ERoutes } from "@/main";
import { formatSeconds, useCountdownStore } from "@/stores/countdown-store";
import { Link, useNavigate } from "react-router-dom";

import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { useEffect, useRef } from "react";

export const LandingPage = () => {
  const { error, isPending, data: bands } = useFetch<BandData[]>(`${apiBaseUrl}/bands`);

  const navigate = useNavigate();

  const { remainingSeconds, startCountdown } = useCountdownStore();
  useEffect(() => {
    const milisecondsUntillEvent = new Date("2025-07-15T12:00:00").getTime() - Date.now();
    startCountdown(milisecondsUntillEvent / 1000);
  }, []);

  // "Cacher" den slicede data, indtil amountOfDataShown eller data ændrer sig.
  const totalBands = 16;
  const slicedBands = bands?.slice(0, totalBands);

  const myRef = useRef<HTMLElement | null>(null);

  const { days, hours, minutes, seconds } = formatSeconds(remainingSeconds);

  return (
    <>
      <section className="h-[77vh] sm:h-[80vh] flex flex-col justify-between items-center">
        <div className="w-full h-full brightness-[0.45] absolute top-0 left-0 -z-10">
          <img
            src="/src/assets/img/hero.webp"
            alt="Koncert billede"
            className="w-full h-full object-cover brightness-[0.25] absolute top-0 left-0 -z-20"
          />
        </div>

        <div className="h-[65vh] flex flex-col items-center justify-center gap-10 text-center">
          <h1 className="max-w-[600px] ~text-6xl/8xl">Foo Festival 2025</h1>
          <h2 className="mb-16 ~text-xl/2xl">Danmarks vikingeby Roskilde</h2>

          <Button size="lg" variant="accent" onClick={() => navigate(`${ERoutes.BUY_TICKET}`)}>
            Køb billet
          </Button>
        </div>

        <Button
          variant="link"
          onClick={() =>
            myRef.current?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="animate-bounce"
        >
          <ArrowDown className="!w-10 !h-10" />
        </Button>
      </section>

      <section ref={myRef} className="py-40 sm:py-60 flex flex-col items-center justify-center text-center">
        <h2 className="mb-12 sm:mb-24 ~text-3xl/5xl">Rock til enhver smag!</h2>
        <div className="max-w-[700px] *:~text-lg/3xl *:uppercase">
          <div className="mb-10 sm:mb-20 flex gap-x-5 gap-y-3 sm:gap-x-8 sm:gap-y-5 justify-center flex-wrap *:transition-all">
            {error && <div>{error}</div>}
            {isPending && <LoadingSpinner />}
            {slicedBands &&
              slicedBands.map((band) => (
                <Link to={`${ERoutes.BAND}/${band.slug}`} className="hover:text-accent hover:scale-110 hover:font-bold">
                  {band.name}
                </Link>
              ))}
          </div>
          <Link to={ERoutes.SCHEDULE} className="transition-all hover:text-accent hover:scale-110 hover:font-bold">
            Og mange flere...
          </Link>
        </div>
      </section>

      <section className="h-screen pt-32 flex flex-col bg-card text-card-foreground">
        <div className="mb-32 flex gap-4 items-center justify-center text-center">
          <div className="flex flex-col items-center">
            <h1 className="~text-5xl/7xl">{days}</h1>
            <p className="~text-xs/sm uppercase">Dage</p>
          </div>
          <h1 className="pt-1">:</h1>
          <div className="flex flex-col items-center">
            <h1 className="~text-5xl/7xl">{hours < 10 ? `0${hours}` : hours}</h1>
            <p className="~text-xs/sm uppercase">Timer</p>
          </div>
          <h1 className="pt-1">:</h1>
          <div className="flex flex-col items-center">
            <h1 className="~text-5xl/7xl">{minutes < 10 ? `0${minutes}` : minutes}</h1>
            <p className="~text-xs/sm uppercase">Minutter</p>
          </div>
          <h1 className="pt-1">:</h1>
          <div className="flex flex-col items-center">
            <h1 className="~text-5xl/7xl">{seconds < 10 ? `0${seconds}` : seconds}</h1>
            <p className="~text-xs/sm uppercase">Sekunder</p>
          </div>
        </div>

        <div className="p-10 sm:p-20 sm:mb-16 flex flex-col sm:flex-row gap-10 sm:gap-32">
          <div className="flex-1">
            <h2 className="mb-10 sm:mb-20 ~text-3xl/5xl text-center text-pretty sm:text-left">
              Festival med hylst til vores nordiske rødder
            </h2>

            <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:justify-between sm:text-left">
              <div>
                <h3>Hvor?</h3>
                <p className="sm:max-w-[150px] text-pretty">Roskilde Park, 4000 Roskilde</p>
              </div>

              <div className="sm:*:text-right">
                <h3>Hvornår?</h3>
                <p className="sm:max-w-[175px] text-pretty">Mandag 15.- søndag 21. juli 2025</p>
              </div>
            </div>
          </div>

          <div className="mt-10 sm:mt-16 flex-[1.25]">
            <h3 className="mb-4">Hvad er Foo Festival?</h3>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <p>
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
              consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
              pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
              id est laborum.
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
